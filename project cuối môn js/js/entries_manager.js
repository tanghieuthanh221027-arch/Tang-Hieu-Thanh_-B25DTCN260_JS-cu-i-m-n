import { entries, articles } from "../js/data-base.js";

const categoryInput = document.getElementById("categoryInput");
const addBtn = document.getElementById("addBtn");
const categoryBody = document.getElementById("categoryBody");
const searchInput = document.getElementById("searchInput");

seedCategories();
seedArticles();

let categories = JSON.parse(localStorage.getItem("categories")) || [];
let articleList = JSON.parse(localStorage.getItem("articles")) || [];

let editIndex = -1;

function renderCategories(data = categories) {
    categoryBody.innerHTML = "";

    data.forEach((category, index) => {
        categoryBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${category.categoryName}</td>
                <td>
                    <button onclick="editCategory(${index})" class="edit-btn">Edit</button>
                    <button onclick="deleteCategory(${index})" class="delete-btn">Delete</button>
                </td>
            </tr>
        `;
    });

    localStorage.setItem("categories", JSON.stringify(categories));
}

addBtn.addEventListener("click", function () {
    const value = categoryInput.value.trim();

    if (value === "") {
        alert("Vui lòng nhập tên category");
        return;
    }

    if (editIndex === -1) {
        const newCategory = {
            id: Date.now(),
            categoryName: value,
        };

        categories.push(newCategory);
    } else {
        const oldCategoryName = categories[editIndex].categoryName;
        categories[editIndex].categoryName = value;

        articleList.forEach(article => {
            if (article.entries === oldCategoryName) {
                article.entries = value;
            }
        });

        localStorage.setItem("articles", JSON.stringify(articleList));

        editIndex = -1;
        addBtn.textContent = "Add Category";
    }

    localStorage.setItem("categories", JSON.stringify(categories));

    categoryInput.value = "";
    renderCategories();
});

function deleteCategory(index) {
    const categoryName = categories[index].categoryName;

    const isUsed = articleList.some(article => article.entries === categoryName);

    if (isUsed) {
        alert("It cannot be deleted because there are still posts related to this topic.");
        return;
    }

    if (confirm("Are you sure you want to delete this category?")) {
        categories.splice(index, 1);
        localStorage.setItem("categories", JSON.stringify(categories));
        renderCategories();
    }
}

function editCategory(index) {
    categoryInput.value = categories[index].categoryName;
    editIndex = index;
    addBtn.textContent = "Update Category";
}

searchInput.addEventListener("input", function () {
    const keyword = searchInput.value.toLowerCase();

    const filtered = categories.filter(category =>
        category.categoryName.toLowerCase().includes(keyword)
    );

    renderCategories(filtered);
});

function seedCategories() {
    let existing = JSON.parse(localStorage.getItem("categories"));

    if (!existing || existing.length === 0) {
        localStorage.setItem("categories", JSON.stringify(entries));
    }
}

function seedArticles() {
    let existing = JSON.parse(localStorage.getItem("articles"));

    if (!existing || existing.length === 0) {
        localStorage.setItem("articles", JSON.stringify(articles));
    }
}

window.deleteCategory = deleteCategory;
window.editCategory = editCategory;

renderCategories();