const categoryInput = document.getElementById("categoryInput");
const addBtn = document.getElementById("addBtn");
const categoryBody = document.getElementById("categoryBody");
const searchInput = document.getElementById("searchInput");

let categories = JSON.parse(localStorage.getItem("categories")) || [
    {
        id: 1,
        categoryName: "Nhật ký học tập",
    },
    {
        id: 2,
        categoryName: "Nhật ký trải nghiệm - học qua đời sống",
    },
];

let editIndex = -1;

function renderCategories(data = categories) {
    categoryBody.innerHTML = "";

    data.forEach((category, index) => {
        categoryBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${category.categoryName}</td>
                <td>
                    <button onclick="editCategory(${index})">Edit</button>
                    <button onclick="deleteCategory(${index})">Delete</button>
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
        categories[editIndex].categoryName = value;
        editIndex = -1;
        addBtn.textContent = "Add Category";
    }

    categoryInput.value = "";
    renderCategories();
});

function deleteCategory(index) {
    const categoryName = categories[index].categoryName;

    const articles = JSON.parse(localStorage.getItem("articles")) || [
        {
            id: 1,
            title: "Deadline đầu tiên của kỳ học",
            entries: "Nhật ký học tập",
            content: "Hôm nay mình vừa nộp xong bài tập lớn.",
            mood: "Căng thẳng",
            status: "Riêng tư",
            image: "image1.jpg",
            date: "2025-02-23",
        },
        {
            id: 2,
            title: "Cà phê chiều chủ nhật",
            entries: "Nhật ký trải nghiệm - học qua đời sống",
            content: "Ngồi một mình trong quán quen...",
            mood: "Thư giãn",
            status: "Công khai",
            image: "image2.jpg",
            date: "2025-03-15",
        },
    ];

    const isUsed = articles.some(article => article.entries === categoryName);

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
renderCategories();