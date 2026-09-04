const API_URL =
    "https://e-cell-bareilly-college.onrender.com/api/admin";

let applications = [];
let messages = [];


// ===============================
// AUTH CHECK
// ===============================

const token = localStorage.getItem("adminToken");

if (!token) {

    window.location.href = "admin-login.html";

}


// ===============================
// LOAD DASHBOARD
// ===============================

async function loadDashboard() {

    try {

        const response = await fetch(
            `${API_URL}/dashboard`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (response.status === 401) {
            logout();
            return;
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        document.getElementById(
            "totalApplications"
        ).textContent =
            data.data.totalApplications;

        document.getElementById(
            "totalMessages"
        ).textContent =
            data.data.totalMessages;

    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }

}


// ===============================
// LOAD APPLICATIONS
// ===============================

async function loadApplications() {

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
            logout();
            return;
        }

        const data = await response.json();

        applications = data.data || [];

        renderApplications(applications);

    } catch (error) {

        console.error(
            "Applications Error:",
            error
        );

    }

}


// ===============================
// RENDER APPLICATIONS
// ===============================

function renderApplications(data) {

    const table =
        document.getElementById(
            "applicationsTable"
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

            <td>
                ${formatDate(item.submittedAt)}
            </td>

        </tr>

    `).join("");

}


// ===============================
// LOAD CONTACT MESSAGES
// ===============================

async function loadMessages() {

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
            logout();
            return;
        }

        const data = await response.json();

        messages = data.data || [];

        renderMessages(messages);

    } catch (error) {

        console.error(
            "Messages Error:",
            error
        );

    }

}


// ===============================
// RENDER MESSAGES
// ===============================

function renderMessages(data) {

    const table =
        document.getElementById(
            "messagesTable"
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

            <td>
                ${formatDate(item.submittedAt)}
            </td>

        </tr>

    `).join("");

}


// ===============================
// SEARCH APPLICATIONS
// ===============================

function filterApplications() {

    const query =
        document
            .getElementById("applicationSearch")
            .value
            .toLowerCase();

    const filtered =
        applications.filter(item =>

            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(query)

        );

    renderApplications(filtered);

}


// ===============================
// SEARCH MESSAGES
// ===============================

function filterMessages() {

    const query =
        document
            .getElementById("messageSearch")
            .value
            .toLowerCase();

    const filtered =
        messages.filter(item =>

            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(query)

        );

    renderMessages(filtered);

}


// ===============================
// SECTION SWITCH
// ===============================

function showSection(section) {

    document
        .getElementById("dashboardSection")
        .classList.add("hidden");

    document
        .getElementById("applicationsSection")
        .classList.add("hidden");

    document
        .getElementById("messagesSection")
        .classList.add("hidden");


    document
        .getElementById(`${section}Section`)
        .classList.remove("hidden");


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    event.target.classList.add("active");


    if (section === "applications") {
        loadApplications();
    }

    if (section === "messages") {
        loadMessages();
    }

}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem(
        "adminToken"
    );

    window.location.href =
        "admin-login.html";

}


// ===============================
// HELPERS
// ===============================

function formatDate(date) {

    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleString(
        "en-IN"
    );

}


function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

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

loadDashboard();