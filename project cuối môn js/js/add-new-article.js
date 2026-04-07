import { articles as sampleArticles, entries } from "./data-base.js";

document.addEventListener("DOMContentLoaded", function () {
    const blogList = document.getElementById("blogList");

    // =========================
    // Khởi tạo localStorage
    // =========================
    if (!localStorage.getItem("articles")) {
        localStorage.setItem("articles", JSON.stringify(sampleArticles));
    }

    // =========================
    // Current user
    // =========================
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "../pages/login.html";
        return;
    }

    // đọc từ localStorage, bài mới thêm sẽ hiện
    const allArticles = JSON.parse(localStorage.getItem("articles")) || sampleArticles;

    let articles = allArticles.filter(
        (article) => Number(article.userID) === Number(currentUser.id)
    );

    let filteredArticles = [...articles];
    let activeCategory = "All";

    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    let currentPage = 1;
    const itemsPerPage = 6;

    // =========================
    // Render filter buttons
    // =========================
    function renderFilterButtons() {
        const filterContainer = document.getElementById("filterContainer");
        if (!filterContainer) return;

        const allCategories = ["All", ...entries.map((e) => e.categoryName)];

        filterContainer.innerHTML = allCategories
            .map(
                (cat) => `
            <button 
                class="filter-tag ${cat === activeCategory ? "active" : ""}" 
                data-category="${cat}">
                ${cat}
            </button>
        `
            )
            .join("");

        filterContainer.querySelectorAll(".filter-tag").forEach((btn) => {
            btn.addEventListener("click", function () {
                activeCategory = this.dataset.category;

                if (activeCategory === "All") {
                    filteredArticles = [...articles];
                } else {
                    filteredArticles = articles.filter(
                        (article) => article.entries === activeCategory
                    );
                }

                currentPage = 1;
                renderFilterButtons(); // cập nhật active
                renderArticles();
            });
        });
    }

    // =========================
    // Render articles
    // =========================
    function renderArticles() {
        blogList.innerHTML = "";

        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let currentArticles = filteredArticles.slice(start, end);

        if (currentArticles.length === 0) {
            blogList.innerHTML = `<p class="empty-msg">Chưa có bài viết nào trong chủ đề này.</p>`;
            renderPagination();
            return;
        }

        currentArticles.forEach((article) => {
            blogList.innerHTML += `
                <div class="blog-card">
                    <img src="${article.image?.startsWith('http')
                    ? article.image
                    : article.image
                        ? `../assets/images/${article.image}`
                        : `https://picsum.photos/400/250?random=${article.id}`
                }" alt="${article.title}">

                    <div class="blog-content">
                        <p class="article-date">Date: ${article.date}</p>

                        <div class="date">
                            <h3>${article.title}</h3>
                        </div>

                        <p class="op">${article.content}</p>

                        <div class="name-content">
                            <button class="name-blog-1" data-category="${article.entries}">
                                ${article.entries}
                            </button>

                            <button class="edit" data-id="${article.id}">Edit your post</button>
                        </div>
                    </div>
                </div>
            `;
        });

        renderPagination();
    }

    // =========================
    // Pagination
    // =========================
    function renderPagination() {
        const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
        const pagination = document.querySelector(".pagination");

        pagination.innerHTML = `
            <a href="#" id="prevBtn" ${currentPage === 1 ? 'style="visibility:hidden"' : ""}>← Previous</a>

            <div class="page-numbers">
                ${Array.from(
            { length: totalPages },
            (_, i) => `
                    <span class="${currentPage === i + 1 ? "active" : ""}" data-page="${i + 1}">
                        ${i + 1}
                    </span>
                `
        ).join("")}
            </div>

            <a href="#" id="nextBtn" ${currentPage === totalPages || totalPages === 0 ? 'style="visibility:hidden"' : ""}>Next →</a>
        `;

        document.querySelectorAll(".page-numbers span").forEach((btn) => {
            btn.addEventListener("click", function () {
                currentPage = Number(this.dataset.page);
                renderArticles();
            });
        });

        document.getElementById("prevBtn")?.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                renderArticles();
            }
        });

        document.getElementById("nextBtn")?.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                renderArticles();
            }
        });
    }

    // =========================
    // Khởi chạy
    // =========================
    renderFilterButtons();
    renderArticles();
});