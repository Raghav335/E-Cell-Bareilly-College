// ================================
// LOAD TEAM MEMBERS
// ================================

async function loadTeam() {

    const container = document.getElementById("teamContainer");

    if (!container) return;

    try {

        const response = await fetch(
    "https://e-cell-bareilly-college.onrender.com/api/members"
);
        const result = await response.json();

        console.log("Team API:", result);

        if (!result.success || !result.data || result.data.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    <h3>Our Team</h3>
                    <p>Team members will be displayed here.</p>
                </div>
            `;

            return;
        }


        // ================================
        // CREATE TEAM CARDS
        // ================================

        container.innerHTML = result.data.map(member => {

            // Generate initials
            const initials = member.name
                .split(" ")
                .map(word => word.charAt(0))
                .join("")
                .substring(0, 2)
                .toUpperCase();


            return `
                <article class="team-card">

                    <!-- TEAM IMAGE -->

                    <div class="team-image">

                        <img 
                            src="${member.image}" 
                            alt="${member.name}"
                            loading="lazy"
                            onerror="
                                this.style.display='none';
                                this.nextElementSibling.style.display='flex';
                            "
                        >

                        <!-- IMAGE PLACEHOLDER -->

                        <div 
                            class="team-placeholder"
                            style="display:none;"
                        >
                            ${initials}
                        </div>

                    </div>


                    <!-- TEAM INFORMATION -->

                    <div class="team-info">

                        <span>
                            ${member.role}
                        </span>

                        <h3>
                            ${member.name}
                        </h3>


                        <!-- LINKEDIN -->

                        ${
                            member.linkedin &&
                            member.linkedin !== "#"
                            ? `
                                <a 
                                    href="${member.linkedin}" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn →
                                </a>
                            `
                            : ""
                        }

                    </div>

                </article>
            `;

        }).join("");


    } catch (error) {

        console.error("Team Loading Error:", error);

        container.innerHTML = `
            <div class="empty-state">
                <h3>Unable to load team</h3>
                <p>Please try again later.</p>
            </div>
        `;

    }

}


// ================================
// PAGE LOAD
// ================================

document.addEventListener("DOMContentLoaded", () => {

    // Load team members
    loadTeam();


    // ================================
    // MOBILE MENU
    // ================================

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.querySelector(".nav-menu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("active");


            // Change hamburger icon
            if (navMenu.classList.contains("active")) {

                menuBtn.innerHTML = "✕";

            } else {

                menuBtn.innerHTML = "☰";

            }

        });


        // ================================
        // CLOSE MENU AFTER LINK CLICK
        // ================================

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuBtn.innerHTML = "☰";

            });

        });

    }


    // ================================
    // SMOOTH SCROLL
    // ================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(
                this.getAttribute("href")
            );


            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});