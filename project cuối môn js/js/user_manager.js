const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const users = JSON.parse(localStorage.getItem("users")) || [];

if (!currentUser) {
    window.location.href = "../pages/login.html";
}

if (currentUser.role !== "admin") {
    window.location.href = "../index.html";
}

const avatar = document.getElementById("avatar");

if (avatar) {
    avatar.src = currentUser.avatar || "https://i.pravatar.cc/40";
}

const logoutBtn = document.getElementById("btnLogout");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        window.location.href = "../pages/login.html";
    });
}

const userList = users.filter(user => user.role === "user");

const userCount = document.getElementById("userCount");

if (userCount) {
    userCount.textContent = `${userList.length} users`;
}

const tableBody = document.getElementById("tableBody");

if (tableBody) {
    tableBody.innerHTML = "";

    if (userList.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4">Không có user nào</td>
            </tr>
        `;
    } else {
        userList.forEach((user, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <div class="user">
                        <img src="${user.avatar || `https://i.pravatar.cc/35?img=${index + 1}`}">
                        <div>
                            <p>${user.firstname} ${user.lastname}</p>
                            <span>@${user.lastname}</span>
                        </div>
                    </div>
                </td>
                <td>hoạt động</td>
                <td>${user.email}</td>
                <td>
                    <button class="block">block</button>
                    <button class="unblock">unblock</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }
}