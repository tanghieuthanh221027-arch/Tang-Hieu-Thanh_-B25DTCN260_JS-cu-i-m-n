document.addEventListener("DOMContentLoaded", function () {
    const formInput = document.getElementById("loginForm");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    seedUsers();

    let users = JSON.parse(localStorage.getItem("users"));

    formInput.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const user = users.find(item =>
            item.email === email && item.password === password
        );

        if (!user) {
            alert("Sai email hoặc mật khẩu");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        if (user.role === "admin") {
            window.location.href = "../pages/user_manager.html";
        } else {
            window.location.href = "../index.html";
        }
    });

    function seedUsers() {
        let existingUsers = JSON.parse(localStorage.getItem("users"));

        if (!existingUsers || existingUsers.length === 0) {
            const defaultUsers = [
                {
                    id: 1,
                    firstname: "Lê",
                    lastname: "Minh Thu",
                    email: "minhthu@gmail.com",
                    password: "123456",
                    role: "user"
                },
                {
                    id: 2,
                    firstname: "Vũ",
                    lastname: "Hồng Vân",
                    email: "hongvan@yahoo.com",
                    password: "abc123",
                    role: "user"
                },
                {
                    id: 3,
                    firstname: "Tăng",
                    lastname: "Hiếu Thành",
                    email: "tht2107@gmail.com",
                    password: "tht22102007",
                    role: "admin"
                }
            ];

            localStorage.setItem("users", JSON.stringify(defaultUsers));
        }
    }
});