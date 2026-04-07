import { articles as sampleArticles } from "./data-base.js";

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("articles")) {
        localStorage.setItem("articles", JSON.stringify(sampleArticles));
    }

    let articles = JSON.parse(localStorage.getItem("articles")) || [];

    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    let currentPage = 1;
    const itemsPerPage = 2;

    function saveArticles() {
        localStorage.setItem("articles", JSON.stringify(articles));
    }

    function renderPosts() {
        const tableBody = document.getElementById("articleTableBody");
        tableBody.innerHTML = "";

        const start = (currentPage - 1) * itemsPerPage;
        const currentArticles = articles.slice(start, start + itemsPerPage);

        currentArticles.forEach(article => {
            const imageSrc = article.image
                ? article.image.startsWith("http")
                    ? article.image
                    : `../assets/images/${article.image}`
                : `https://picsum.photos/120/80?random=${article.id}`;

            tableBody.innerHTML += `
                <tr data-id="${article.id}">
                    <td><img src="${imageSrc}" alt=""></td>
                    <td>${article.title}</td>
                    <td>${article.entries}</td>
                    <td>${article.content.slice(0, 40)}...</td>
                    <td>
                        <span class="status ${article.status === "Public" ? "public" : "private"}">
                            ${article.status}
                        </span>
                    </td>
                    <td>
                        <select class="status-select">
                            <option value="Public" ${article.status === "Public" ? "selected" : ""}>Public</option>
                            <option value="Private" ${article.status === "Private" ? "selected" : ""}>Private</option>
                        </select>
                    </td>
                    <td>
                        <button class="edit-btn">Sửa</button>
                        <button class="delete-btn">Xóa</button>
                    </td>
                </tr>
            `;
        });

        addEvents();
        renderPagination();
    }

    function addEvents() {

        // DELETE
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.onclick = function () {
                const id = Number(this.closest("tr").dataset.id);

                if (confirm("Bạn có chắc muốn xóa bài viết?")) {
                    articles = articles.filter(article => article.id !== id);

                    let totalPages = Math.ceil(articles.length / itemsPerPage);

                    if (currentPage > totalPages && totalPages > 0) {
                        currentPage = totalPages;
                    }

                    saveArticles();
                    renderPosts();
                }
            };
        });

        // EDIT
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.onclick = function () {
                const id = Number(this.closest("tr").dataset.id);

                localStorage.setItem("editArticleId", id);

                window.location.href = "form_addBlog.html";
            };
        });

        // STATUS
        document.querySelectorAll(".status-select").forEach(select => {
            select.onchange = function () {
                const id = Number(this.closest("tr").dataset.id);

                const article = articles.find(item => item.id === id);

                if (article) {
                    article.status = this.value;
                    saveArticles();
                    renderPosts();
                }
            };
        });
    }

    function renderPagination() {
        const pagination = document.getElementById("pagination");

        const totalPages = Math.ceil(articles.length / itemsPerPage);

        pagination.innerHTML = `
            <button ${currentPage === 1 ? "disabled" : ""} id="prevBtn">Previous</button>

            <div class="page-numbers">
                ${Array.from({ length: totalPages }, (_, i) => `
                    <span class="${currentPage === i + 1 ? "active" : ""}" data-page="${i + 1}">
                        ${i + 1}
                    </span>
                `).join("")}
            </div>

            <button ${currentPage === totalPages ? "disabled" : ""} id="nextBtn">Next</button>
        `;

        document.querySelectorAll(".page-numbers span").forEach(btn => {
            btn.onclick = function () {
                currentPage = Number(this.dataset.page);
                renderPosts();
            };
        });

        document.getElementById("prevBtn").onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderPosts();
            }
        };

        document.getElementById("nextBtn").onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPosts();
            }
        };
    }

    renderPosts();
});