document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("open-responsive-navbar");
    const closeBtn = document.getElementById("close-responsive-navbar");
    const navBar = document.querySelector(".navBar ul");
    const headerContent = document.querySelector(".header-content");
    let isNavBarOpened = false;

    function toggleNavBar() {
        openBtn.style.display = isNavBarOpened ? "block" : "none";
        closeBtn.style.display = isNavBarOpened ? "none" : "block";
        navBar.classList.toggle("navBar-active");

        if (window.scrollY === 0 && navBar.classList.contains("navBar-active")) {
            headerContent.classList.remove("is-expanded");
            headerContent.classList.add("is-compressed");
        }
        isNavBarOpened = !isNavBarOpened;
    }

    openBtn.addEventListener("click", toggleNavBar);
    closeBtn.addEventListener("click", toggleNavBar);

    window.addEventListener("scroll", function () {
        if (isNavBarOpened) {
            toggleNavBar();
        }
    });

    const navLinks = document.querySelectorAll(".navBar a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeBtn.click();
        });
    });
});
