import { articles as sampleArticles } from "./data-base.js";

document.addEventListener("DOMContentLoaded", function () {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let authButtons = document.getElementById("authButtons");

    // =========================
    // AUTH HEADER
    // =========================
    if (currentUser) {
        authButtons.innerHTML = `
            <div class="user-profile">
                <img src="${currentUser.avatar || './assets/images/Avatar.png'}" alt="User Avatar" id="avatarBtn">
                <div class="dropdown" id="dropdownMenu">
                    <div class="dropdown-content">
                        <div class="user-info">
                            <strong>${currentUser.firstname} ${currentUser.lastname}</strong><br>
                            <small>${currentUser.email}</small>
                        </div>
                        <a href="#">View profile</a>
                        <a href="#">Update profile picture</a>
                        <a href="#">Change password</a>
                        <a href="#" id="logoutBtn">Log out</a>
                    </div>
                </div>
            </div>
        `;
    } else {
        authButtons.innerHTML = `
            <a href="./pages/register.html" class="btn">Sign Up</a>
            <a href="./pages/login.html" class="btn">Sign In</a>
        `;
    }

    document.addEventListener("click", function (e) {
        let avatarBtn = document.getElementById("avatarBtn");
        let dropdownMenu = document.getElementById("dropdownMenu");

        if (avatarBtn && avatarBtn.contains(e.target)) {
            dropdownMenu.classList.toggle("show");
        } else if (dropdownMenu && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove("show");
        }

        if (e.target.id === "logoutBtn") {
            localStorage.removeItem("currentUser");
            window.location.reload();
        }
    });

    // =========================
    // FORCE UPDATE DATA MẪU
    // =========================
    let savedArticles = JSON.parse(localStorage.getItem("articles")) || [];

    if (savedArticles.length === 0) {
        localStorage.setItem("articles", JSON.stringify(sampleArticles));
        savedArticles = sampleArticles;
    }

    let allArticles = savedArticles;

    allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // =========================
    // CATEGORY FILTER
    // =========================
    const categoryContainer = document.querySelector(".category-container");
    let filteredArticles = [...allArticles];
    let activeCategory = "all";
    let currentPage = 1;
    const itemsPerPage = 6;

    function renderCategories() {
        if (!categoryContainer) return;

        const categories = [...new Set(allArticles.map(a => a.entries))];

        categoryContainer.innerHTML = `
            <button class="category-btn ${activeCategory === "all" ? "active" : ""}" data-category="all">
                All <span class="count">(${allArticles.length})</span>
            </button>
        `;

        categories.forEach(cat => {
            const count = allArticles.filter(a => a.entries === cat).length;

            categoryContainer.innerHTML += `
                <button class="category-btn ${activeCategory === cat ? "active" : ""}" data-category="${cat}">
                    ${cat} <span class="count">(${count})</span>
                </button>
            `;
        });

        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                activeCategory = this.dataset.category;

                filteredArticles = activeCategory === "all"
                    ? [...allArticles]
                    : allArticles.filter(a => a.entries === activeCategory);

                currentPage = 1;
                renderCategories();
                renderPosts();
            });
        });
    }

    // =========================
    // IMAGE HELPER
    // =========================
    function getImageSrc(article) {
        if (article.image) {
            if (article.image.startsWith("http")) {
                return article.image;
            }
            return `../assets/images/${article.image}`;
        }

        return `https://picsum.photos/400/250?random=${article.id}`;
    }

    // =========================
    // RECENT POSTS
    // =========================
    function renderRecentPosts(recentArticles) {
        let recentLarge = document.querySelector(".recent-large");
        let recentSmall = document.querySelector(".recent-small");

        if (!recentLarge || !recentSmall) return;

        recentLarge.innerHTML = "";
        recentSmall.innerHTML = "";

        if (recentArticles.length > 0) {
            recentLarge.innerHTML = `
                <div class="post-card large" data-id="${recentArticles[0].id}">
                    <img src="${getImageSrc(recentArticles[0])}" alt="">
                    <div class="post-info">
                        <span class="date">Date: ${recentArticles[0].date}</span>
                        <h3>${recentArticles[0].title}</h3>
                        <p>${recentArticles[0].content}</p>
                        <span class="category">${recentArticles[0].entries}</span>
                    </div>
                </div>
            `;
        }

        for (let i = 1; i < recentArticles.length; i++) {
            recentSmall.innerHTML += `
                <div class="post-card small" data-id="${recentArticles[i].id}">
                    <img src="${getImageSrc(recentArticles[i])}" alt="">
                    <div class="post-info">
                        <span class="date">Date: ${recentArticles[i].date}</span>
                        <h3>${recentArticles[i].title}</h3>
                        <p>${recentArticles[i].content}</p>
                        <span class="category">${recentArticles[i].entries}</span>
                    </div>
                </div>
            `;
        }

        addDetailEvents();
    }

    // =========================
    // POSTS GRID
    // =========================
    function renderPosts() {
        let postsGrid = document.querySelector(".posts-grid");
        if (!postsGrid) return;

        postsGrid.innerHTML = "";

        let start = (currentPage - 1) * itemsPerPage;
        let currentArticles = filteredArticles.slice(start, start + itemsPerPage);

        if (currentArticles.length === 0) {
            postsGrid.innerHTML = `<p>No posts found.</p>`;
        }

        currentArticles.forEach(article => {
            postsGrid.innerHTML += `
                <div class="post-card" data-id="${article.id}">
                    <img src="${getImageSrc(article)}" alt="">
                    <div class="post-info">
                        <span class="date">Date: ${article.date}</span>
                        <h3>${article.title}</h3>
                        <p>${article.content}</p>
                        <span class="category">${article.entries}</span>
                    </div>
                </div>
            `;
        });

        addDetailEvents();
        renderPagination();
    }

    // =========================
    // DETAIL EVENT
    // =========================
    function addDetailEvents() {
        document.querySelectorAll(".post-card").forEach(card => {
            card.addEventListener("click", function () {
                let id = Number(this.dataset.id);

                let selectedArticle = allArticles.find(article => article.id === id);

                localStorage.setItem("selectedArticle", JSON.stringify(selectedArticle));

                window.location.href = "./pages/detailblog.html";
            });
        });
    }

    // =========================
    // PAGINATION
    // =========================
    function renderPagination() {
        let totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
        let pagination = document.querySelector(".pagination");

        if (!pagination) return;

        pagination.innerHTML = `
            <a href="#" id="prevBtn" ${currentPage === 1 ? 'style="visibility:hidden"' : ""}>← Previous</a>

            <div class="page-numbers">
                ${Array.from({ length: totalPages }, (_, i) => `
                    <span class="${currentPage === i + 1 ? "active" : ""}" data-page="${i + 1}">
                        ${i + 1}
                    </span>
                `).join("")}
            </div>

            <a href="#" id="nextBtn" ${currentPage === totalPages || totalPages === 0 ? 'style="visibility:hidden"' : ""}>Next →</a>
        `;

        document.querySelectorAll(".page-numbers span").forEach(btn => {
            btn.addEventListener("click", function () {
                currentPage = Number(this.dataset.page);
                renderPosts();
            });
        });

        document.getElementById("prevBtn")?.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderPosts();
            }
        });

        document.getElementById("nextBtn")?.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                renderPosts();
            }
        });
    }

    // =========================
    // START
    // =========================
    renderRecentPosts(allArticles.slice(0, 3));
    renderCategories();
    renderPosts();
});