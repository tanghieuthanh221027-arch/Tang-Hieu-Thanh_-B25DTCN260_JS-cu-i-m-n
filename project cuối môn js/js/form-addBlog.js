import { entries } from "../js/data-base.js";

document.addEventListener("DOMContentLoaded", function () {

    const titleInput = document.querySelectorAll("input[type='text']")[0];
    const categorySelect = document.getElementById("categorySelect");
    const moodSelect = document.getElementById("mood");
    const contentInput = document.querySelector("textarea");
    const statusInputs = document.querySelectorAll("input[name='status']");
    const fileInput = document.getElementById("file-upload");
    const addBtn = document.querySelector(".add-btn");
    const headerTitle = document.querySelector(".header p");
    const closeBtn = document.querySelector(".close-btn");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "../pages/login.html";
        return;
    }

    if (!localStorage.getItem("categories")) {
        localStorage.setItem("categories", JSON.stringify(entries));
    }

    let articles = JSON.parse(localStorage.getItem("articles")) || [];
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    let editId = localStorage.getItem("editArticleId");

    function renderCategories() {
        categorySelect.innerHTML = `<option value="">-- Select category --</option>`;

        categories.forEach(item => {
            const option = document.createElement("option");
            option.value = item.categoryName || item;
            option.textContent = item.categoryName || item;
            categorySelect.appendChild(option);
        });
    }

    renderCategories();

    // EDIT MODE
    let editingArticle = null;

    if (editId) {
        editingArticle = articles.find(item => item.id == editId);

        if (editingArticle) {
            titleInput.value = editingArticle.title;
            categorySelect.value = editingArticle.entries;
            moodSelect.value = editingArticle.mood;
            contentInput.value = editingArticle.content;

            statusInputs.forEach(input => {
                if (input.nextElementSibling.textContent.trim() === editingArticle.status) {
                    input.checked = true;
                }
            });

            headerTitle.textContent = "📝 Sửa bài viết";
            addBtn.textContent = "Update";
        }
    }

    closeBtn.addEventListener("click", function () {
        localStorage.removeItem("editArticleId");
        window.history.back();
    });

    addBtn.addEventListener("click", function () {

        const title = titleInput.value.trim();
        const category = categorySelect.value;
        const mood = moodSelect.value;
        const content = contentInput.value.trim();

        let status = "";

        statusInputs.forEach(input => {
            if (input.checked) {
                status = input.nextElementSibling.textContent.trim();
            }
        });

        if (!title || !category || !mood || !content || !status) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        const articleData = {
            id: editingArticle ? editingArticle.id : Date.now(),
            title,
            entries: category,
            content,
            mood,
            status,
            image: fileInput.files[0]
                ? fileInput.files[0].name
                : editingArticle?.image || "",
            date: new Date().toISOString().split("T")[0],
            userID: editingArticle ? editingArticle.userID : currentUser.id
        };

        if (editingArticle) {
            const index = articles.findIndex(item => item.id == editId);
            articles[index] = articleData;
            localStorage.removeItem("editArticleId");
        } else {
            articles.push(articleData);
        }

        localStorage.setItem("articles", JSON.stringify(articles));

        alert("Lưu bài viết thành công!");

        window.location.href = "article_manager.html";
    });
});