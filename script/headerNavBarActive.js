document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll('.navBar li a');

    window.addEventListener("scroll", onScroll);

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.hash;
            if (target) {
                window.removeEventListener("scroll", onScroll);
                menuLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                document.querySelector(target).scrollIntoView({ behavior: 'smooth' });

                window.location.hash = target;
                window.addEventListener("scroll", onScroll);
            }
        });
    });

    window.addEventListener("load", onScroll);
});

function onScroll() {
    const scrollPos = window.scrollY;
    const menuLinks = document.querySelectorAll('.navBar li a');

    menuLinks.forEach(currLink => {
        const refElement = document.querySelector(currLink.getAttribute("href"));
        if (refElement) {
            const refTop = refElement.getBoundingClientRect().top + window.scrollY - 1;
            const refBottom = refTop + refElement.getBoundingClientRect().height;
            const isActive = refTop <= scrollPos && refBottom > scrollPos;
            currLink.classList.toggle("active", isActive);
        }
    });
}