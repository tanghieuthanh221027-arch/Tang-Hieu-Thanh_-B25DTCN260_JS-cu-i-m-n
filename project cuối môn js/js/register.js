// import dữ liệu user mẫu từ file data-base
import { user } from "../js/data-base.js";


// =========================
// Chờ DOM load xong mới chạy JS
// tránh lỗi vì DOM chưa tồn tại
// =========================
document.addEventListener("DOMContentLoaded", function () {

    // gọi hàm seed dữ liệu user mẫu vào localStorage nếu chưa có
    seedUsers();


    // lấy nút signup
    const signupBtn = document.querySelector(".signupBtn");


    // =========================
    // Bắt sự kiện click đăng ký
    // =========================
    signupBtn.addEventListener("click", function () {

        // lấy dữ liệu từ input và trim() để bỏ khoảng trắng đầu cuối
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();


        // lấy danh sách users hiện tại từ localStorage
        // nếu chưa có thì khởi tạo mảng rỗng
        let users = JSON.parse(localStorage.getItem("users")) || [];


        // =========================
        // Validate dữ liệu rỗng
        // nếu có field nào chưa nhập thì dừng
        // =========================
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert("Điền đầy đủ thông tin");
            return;
        }


        // =========================
        // Kiểm tra password và confirmPassword có khớp không
        // =========================
        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp");
            return;
        }


        // =========================
        // Kiểm tra email đã tồn tại chưa
        // dùng find() để tìm user trùng email
        // =========================
        let checkEmail = users.find(item => item.email === email);

        if (checkEmail) {
            alert("Email đã tồn tại");
            return;
        }


        // =========================
        // Tạo object user mới
        // =========================
        const newUser = {
            id: Date.now(), // tạo id unique theo timestamp
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            role: "user" // mặc định role user
        };


        // =========================
        // Thêm user mới vào mảng users
        // =========================
        users.push(newUser);


        // =========================
        // Lưu lại localStorage
        // =========================
        localStorage.setItem("users", JSON.stringify(users));


        // thông báo thành công
        alert("Đăng ký thành công");


        // chuyển sang login page
        window.location.href = "../pages/login.html";
    });


    // =========================
    // Hàm seedUsers()
    // Nếu localStorage chưa có users
    // thì đẩy dữ liệu mẫu vào
    // =========================
    function seedUsers() {
        let existingUsers = JSON.parse(localStorage.getItem("users"));

        if (!existingUsers || existingUsers.length === 0) {
            localStorage.setItem("users", JSON.stringify(user));
        }
    }
});