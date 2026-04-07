document.addEventListener("DOMContentLoaded", function () {
    let article = JSON.parse(localStorage.getItem("selectedArticle"));

    if (!article) return;

    document.querySelector(".post-box h2").textContent = article.title;
    document.querySelector(".post-box p").textContent = article.content;

    // nút back
    document.querySelector(".back-btn").addEventListener("click", function () {
        if (document.referrer) {
            window.location.href = document.referrer; // quay về trang trước
        } else {
            window.location.href = "index.html"; // mặc định quay về trang chính
        }
    });
});