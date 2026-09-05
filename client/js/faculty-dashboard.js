const API_URL =
    "https://e-cell-bareilly-college.onrender.com/api/faculty";

let applications = [];
let messages = [];

const token =
    localStorage.getItem("facultyToken");

// ===============================
// AUTH CHECK
// ===============================

if (!token) {
    window.location.href =
        "faculty-login.html";
}

// ===============================
// LOAD DASHBOARD
// ===============================

async function loadFacultyDashboard() {
    try {
        const response = await fetch(
            `${API_URL}/dashboard`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        if (response.status === 401) {
            facultyLogout();
            return;
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        document.getElementById(
            "facultyTotalApplications"
        ).textContent =
            data.data.totalApplications;

        document.getElementById(
            "facultyTotalMessages"
        ).textContent =
            data.data.totalMessages;

    } catch (error) {
        console.error(
            "Faculty Dashboard Error:",
            error
        );
    }
}

// ===============================
// LOAD APPLICATIONS
// ===============================

async function loadFacultyApplications() {
    try {
        const response = await fetch(
            `${API_URL}/applications`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        if (response.status === 401) {
            facultyLogout();
            return;
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        applications =
            data.data || [];

        renderFacultyApplications(
            applications
        );

    } catch (error) {
        console.error(
            "Faculty Applications Error:",
            error
        );
    }
}

// ===============================
// RENDER APPLICATIONS
// ===============================

function renderFacultyApplications(data) {

    const table =
        document.getElementById(
            "facultyApplicationsTable"
        );

    if (!data.length) {

        table.innerHTML = `
            <tr>
                <td colspan="8">
                    No applications found.
                </td>
            </tr>
        `;

        return;
    }

    table.innerHTML = data.map(item => `
        <tr>
            <td>${escapeHTML(item.name)}</td>
            <td>${escapeHTML(item.email)}</td>
            <td>${escapeHTML(item.phone)}</td>
            <td>${escapeHTML(item.course)}</td>
            <td>${escapeHTML(item.year)}</td>
            <td>${escapeHTML(item.interest)}</td>
            <td>${escapeHTML(item.message)}</td>
            <td>${formatDate(item.submittedAt)}</td>
        </tr>
    `).join("");
}

// ===============================
// LOAD CONTACT MESSAGES
// ===============================

async function loadFacultyMessages() {

    try {

        const response = await fetch(
            `${API_URL}/messages`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        if (response.status === 401) {
            facultyLogout();
            return;
        }

        const data =
            await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        messages =
            data.data || [];

        renderFacultyMessages(
            messages
        );

    } catch (error) {

        console.error(
            "Faculty Messages Error:",
            error
        );
    }
}

// ===============================
// RENDER MESSAGES
// ===============================

function renderFacultyMessages(data) {

    const table =
        document.getElementById(
            "facultyMessagesTable"
        );

    if (!data.length) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No contact queries found.
                </td>
            </tr>
        `;

        return;
    }

    table.innerHTML = data.map(item => `
        <tr>
            <td>${escapeHTML(item.name)}</td>
            <td>${escapeHTML(item.email)}</td>
            <td>${escapeHTML(item.subject)}</td>
            <td>${escapeHTML(item.message)}</td>
            <td>${formatDate(item.submittedAt)}</td>
        </tr>
    `).join("");
}

// ===============================
// FILTER APPLICATIONS
// ===============================

function filterFacultyApplications() {

    const query =
        document.getElementById(
            "facultyApplicationSearch"
        ).value
        .toLowerCase();

    const filtered =
        applications.filter(item =>
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(query)
        );

    renderFacultyApplications(
        filtered
    );
}

// ===============================
// FILTER MESSAGES
// ===============================

function filterFacultyMessages() {

    const query =
        document.getElementById(
            "facultyMessageSearch"
        ).value
        .toLowerCase();

    const filtered =
        messages.filter(item =>
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(query)
        );

    renderFacultyMessages(
        filtered
    );
}

// ===============================
// SECTION SWITCHING
// ===============================

function showFacultySection(
    section,
    clickEvent
) {

    document
        .getElementById(
            "facultyDashboardSection"
        )
        .classList.add("hidden");

    document
        .getElementById(
            "facultyApplicationsSection"
        )
        .classList.add("hidden");

    document
        .getElementById(
            "facultyMessagesSection"
        )
        .classList.add("hidden");

    document
        .getElementById(
            `faculty${capitalize(section)}Section`
        )
        .classList.remove("hidden");

    document
        .querySelectorAll(
            ".faculty-nav-btn"
        )
        .forEach(button => {
            button.classList.remove(
                "active"
            );
        });

    if (clickEvent) {
        clickEvent.currentTarget
            .classList.add("active");
    }

    const pageTitle =
        document.getElementById(
            "pageTitle"
        );

    if (section === "dashboard") {

        pageTitle.textContent =
            "Faculty Dashboard";

    } else if (section === "applications") {

        pageTitle.textContent =
            "Join Applications";

        loadFacultyApplications();

    } else if (section === "messages") {

        pageTitle.textContent =
            "Contact Queries";

        loadFacultyMessages();
    }
}

// ===============================
// CAPITALIZE
// ===============================

function capitalize(text) {

    return text.charAt(0).toUpperCase()
        + text.slice(1);
}

// ===============================
// LOGOUT
// ===============================

function facultyLogout() {

    localStorage.removeItem(
        "facultyToken"
    );

    localStorage.removeItem(
        "facultyName"
    );

    window.location.href =
        "faculty-login.html";
}

// ===============================
// DATE FORMAT
// ===============================

function formatDate(date) {

    if (!date) {
        return "-";
    }

    return new Date(date)
        .toLocaleString("en-IN");
}

// ===============================
// HTML SECURITY
// ===============================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ===============================
// INITIAL LOAD
// ===============================

loadFacultyDashboard();