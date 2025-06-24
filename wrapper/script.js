document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar-links[data-page]");
    const contentWrapper = document.querySelector(".content-wrapper");

    async function loadPage(page) {
        try {
            const res = await fetch(`../Pages/${page}`);
            const html = await res.text();
            contentWrapper.innerHTML = html;

            // Optionally load associated JS
            if (page === "Products.html") {
                const script = document.createElement("script");
                script.type = "module";
                script.src = `../pages/Products.js?t=${Date.now()}`;

                contentWrapper.appendChild(script);
            }
            if (page === "Category.html") {
                const script = document.createElement("script");
                script.type = "module";
                script.src = `../pages/Category.js?t=${Date.now()}`;
                contentWrapper.appendChild(script);
            }

        } catch (err) {
            contentWrapper.innerHTML = `<p>Error loading page: ${err.message}</p>`;
        }
    }

    // Default page
    loadPage("Products.html");

    // Navigation handler
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Remove active from others
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            const page = link.getAttribute("data-page");
            loadPage(page);
        });
    });
});
