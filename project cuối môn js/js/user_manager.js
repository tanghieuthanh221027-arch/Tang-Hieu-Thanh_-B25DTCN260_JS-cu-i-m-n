// import dữ liệu user mẫu từ file data-base
import { user } from "../js/data-base.js";

// =========================
// Hàm seedUsers()
// Mục đích:
// Nếu localStorage chưa có "users"
// thì đẩy dữ liệu mẫu từ data-base vào localStorage
// để hệ thống có dữ liệu ban đầu
// =========================
function seedUsers() {
    let users = JSON.parse(localStorage.getItem("users"));

    // nếu chưa có users hoặc mảng rỗng
    if (!users || users.length === 0) {
        localStorage.setItem("users", JSON.stringify(user));
    }
}

// chạy seed ngay khi file load
seedUsers();


// =========================
// DOMContentLoaded
// đảm bảo HTML load xong mới thao tác DOM
// =========================
document.addEventListener("DOMContentLoaded", function () {

    // lấy currentUser từ localStorage
    // currentUser là user đang đăng nhập
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // lấy toàn bộ users từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];


    // =========================
    // Kiểm tra đăng nhập
    // nếu chưa login -> chuyển về login
    // =========================
    if (!currentUser) {
        window.location.href = "../pages/login.html";
        return;
    }


    // =========================
    // Kiểm tra quyền admin
    // nếu không phải admin -> chặn truy cập
    // chuyển về trang chủ
    // =========================
    if (currentUser.role !== "admin") {
        window.location.href = "../index.html";
        return;
    }


    // =========================
    // Hiển thị avatar admin đang đăng nhập
    // =========================
    const avatar = document.getElementById("avatar");

    if (avatar) {
        // nếu user có avatar thì dùng avatar đó
        // nếu không có thì dùng avatar mặc định
        avatar.src = currentUser.avatar || "https://i.pravatar.cc/40";
    }


    // =========================
    // Logout
    // xóa currentUser khỏi localStorage
    // rồi quay về login
    // =========================
    const logoutBtn = document.getElementById("btnLogout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();

            localStorage.removeItem("currentUser");

            window.location.href = "../pages/login.html";
        });
    }


    // =========================
    // Lọc danh sách user thường
    // bỏ admin ra khỏi danh sách
    // =========================
    const userList = users.filter(user => user.role === "user");


    // =========================
    // Hiển thị tổng số user
    // =========================
    const userCount = document.getElementById("userCount");

    if (userCount) {
        userCount.textContent = `${userList.length} users`;
    }


    // =========================
    // Render bảng user
    // =========================
    const tableBody = document.getElementById("tableBody");

    if (tableBody) {

        // reset bảng trước khi render
        tableBody.innerHTML = "";


        // nếu không có user nào
        if (userList.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4">Không có user nào</td>
                </tr>
            `;
        } else {

            // duyệt từng user để render từng dòng
            userList.forEach((user, index) => {

                // tạo row mới
                const row = document.createElement("tr");

                // innerHTML nội dung từng cột
                row.innerHTML = `
                    <td>
                        <div class="user">

                            <!-- avatar user -->
                            <img src="${user.avatar || `https://i.pravatar.cc/35?img=${index + 1}`}">

                            <div>

                                <!-- họ tên -->
                                <p>${user.firstname} ${user.lastname}</p>

                                <!-- username giả -->
                                <span>@${user.lastname}</span>

                            </div>
                        </div>
                    </td>

                    <!-- trạng thái hoạt động -->
                    <td>hoạt động</td>

                    <!-- email -->
                    <td>${user.email}</td>

                    <!-- action -->
                    <td>
                        <button class="block">block</button>
                        <button class="unblock">unblock</button>
                    </td>
                `;

                // append row vào table
                tableBody.appendChild(row);
            });
        }
    }
});