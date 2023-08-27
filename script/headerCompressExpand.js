let isNavBarScrolled = false;
const navBar = document.querySelector(".header-content");

function updateNavBarScroll() {
    if (window.scrollY > 0) {
        if (!isNavBarScrolled) {
            navBar.classList.remove('is-expanded');
            navBar.classList.add('is-compressed');
            isNavBarScrolled = true;
        }
    } else {
        if (isNavBarScrolled) {
            navBar.classList.remove('is-compressed');
            navBar.classList.add('is-expanded');
            isNavBarScrolled = false;
        }
    }
}

// Vérification au chargement de la page
document.addEventListener("DOMContentLoaded", updateNavBarScroll);

// Utilisation de l'événement de scroll
window.addEventListener("scroll", updateNavBarScroll);
