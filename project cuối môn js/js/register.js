document.addEventListener("DOMContentLoaded", function () {
    seedUsers();

    const signupBtn = document.querySelector(".signupBtn");

    signupBtn.addEventListener("click", function () {
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        let users = JSON.parse(localStorage.getItem("users"));

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert("Điền đầy đủ thông tin");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp");
            return;
        }

        let checkEmail = users.find(item => item.email === email);

        if (checkEmail) {
            alert("Email đã tồn tại");
            return;
        }

        const newUser = {
            id: Date.now(),
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            role: "user"
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Đăng ký thành công");

        window.location.href = "../pages/login.html";
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