let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let authButtons = document.getElementById("authButtons");

if (currentUser) {
    authButtons.innerHTML = `
        <div class="user-profile">
            <img src="${currentUser.avatar || './assets/images/Avatar.png'}" alt="User Avatar" id="avatarBtn">

            <div class="dropdown" id="dropdownMenu">
                <div class="dropdown-content">
                    <div class="user-info">
                        <strong>${currentUser.firstname} ${currentUser.lastname}</strong><br>
                        <small>${currentUser.email}</small>
                    </div>

                    <a href="#">View profile</a>
                    <a href="#">Update profile picture</a>
                    <a href="#">Change password</a>
                    <a href="#" id="logoutBtn">Log out</a>
                </div>
            </div>
        </div>
    `;
} else {
    authButtons.innerHTML = `
        <a href="./pages/register.html" class="btn">Sign Up</a>
        <a href="./pages/login.html" class="btn">Sign In</a>
    `;
}

document.addEventListener("click", function (e) {
    let avatarBtn = document.getElementById("avatarBtn");
    let dropdownMenu = document.getElementById("dropdownMenu");

    if (avatarBtn && avatarBtn.contains(e.target)) {
        dropdownMenu.classList.toggle("show");
    } else if (dropdownMenu && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("show");
    }

    if (e.target.id === "logoutBtn") {
        localStorage.removeItem("currentUser");
        window.location.reload();
    }
});