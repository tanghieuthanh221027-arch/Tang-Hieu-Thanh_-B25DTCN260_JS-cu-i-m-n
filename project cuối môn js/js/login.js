// import dữ liệu user mẫu từ file data-base
import { user } from "../js/data-base.js";


// =========================
// Chờ DOM load xong rồi mới thao tác DOM
// =========================
document.addEventListener("DOMContentLoaded", function () {

    // lấy form login
    const formInput = document.getElementById("loginForm");

    // lấy input email
    const emailInput = document.getElementById("emailInput");

    // lấy input password
    const passwordInput = document.getElementById("passwordInput");


    // =========================
    // Seed dữ liệu user mẫu
    // nếu localStorage chưa có users
    // =========================
    seedUsers();


    // =========================
    // Bắt sự kiện submit form login
    // =========================
    formInput.addEventListener("submit", function (e) {

        // chặn reload mặc định của form
        e.preventDefault();


        // lấy dữ liệu input và trim khoảng trắng
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();


        // lấy danh sách users từ localStorage
        // nếu chưa có thì khởi tạo mảng rỗng
        let users = JSON.parse(localStorage.getItem("users")) || [];


        // =========================
        // Kiểm tra user tồn tại không
        // email + password phải khớp
        // dùng find() để tìm user đầu tiên phù hợp
        // =========================
        const foundUser = users.find(item =>
            item.email === email && item.password === password
        );


        // =========================
        // Nếu không tìm thấy -> báo lỗi
        // =========================
        if (!foundUser) {
            alert("Sai email hoặc mật khẩu");
            return;
        }


        // =========================
        // Nếu login thành công:
        // lưu currentUser vào localStorage
        // =========================
        localStorage.setItem("currentUser", JSON.stringify(foundUser));


        // =========================
        // Phân quyền theo role
        // admin -> trang quản lý user
        // user -> trang chủ
        // =========================
        if (foundUser.role === "admin") {
            window.location.href = "../pages/user_manager.html";
        } else {
            window.location.href = "../index.html";
        }
    });


    // =========================
    // Hàm seedUsers()
    // nếu localStorage chưa có users
    // thì nạp dữ liệu mẫu
    // =========================
    function seedUsers() {
        let existingUsers = JSON.parse(localStorage.getItem("users"));

        if (!existingUsers || existingUsers.length === 0) {
            localStorage.setItem("users", JSON.stringify(user));
        }
    }
});