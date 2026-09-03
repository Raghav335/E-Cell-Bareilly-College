// ================================
// LOAD EVENTS
// ================================

async function loadEvents() {

    const container = document.getElementById("eventsContainer");

    if (!container) return;

    try {

        const response = await fetch(
    "https://e-cell-bareilly-college.onrender.com/api/events"
);
        const result = await response.json();

        console.log("Events API:", result);


        if (
            !result.success ||
            !result.data ||
            result.data.length === 0
        ) {

            container.innerHTML = `
                <div class="empty-state">
                    <h3>Events coming soon</h3>
                    <p>
                        Stay connected with E-Cell Bareilly College
                        for upcoming events and activities.
                    </p>
                </div>
            `;

            return;
        }


        // ================================
        // CREATE EVENT CARDS
        // ================================

        container.innerHTML = result.data.map(event => {

            return `
                <article class="event-card">

                    <div class="event-image">

                        <img
                            src="${event.image}"
                            alt="${event.title}"
                            loading="lazy"
                            onerror="
                                this.style.display='none';
                                this.nextElementSibling.style.display='flex';
                            "
                        >

                        <div
                            class="event-image-placeholder"
                            style="display:none;"
                        >
                            EVENT
                        </div>

                    </div>


                    <div class="event-content">

                        <span class="event-date">
                            ${event.date}
                        </span>

                        <h3>
                            ${event.title}
                        </h3>

                        <div class="event-location">
                            📍 ${event.location}
                        </div>

                        <p>
                            ${event.description}
                        </p>

                    </div>

                </article>
            `;

        }).join("");


    } catch (error) {

        console.error("Events Loading Error:", error);

        container.innerHTML = `
            <div class="empty-state">
                <h3>Unable to load events</h3>
                <p>
                    Please try again later.
                </p>
            </div>
        `;

    }

}


// ================================
// PAGE LOAD
// ================================

document.addEventListener("DOMContentLoaded", () => {

    loadEvents();

});