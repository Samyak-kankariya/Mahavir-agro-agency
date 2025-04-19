
document.addEventListener("DOMContentLoaded", function () {
const toggleBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

toggleBtn?.addEventListener("click", () => {
navMenu.classList.toggle("active");
});
});

let lastScrollTop = 0;
const header = document.querySelector('.site-header');

window.addEventListener("scroll", function () {
const scrollTop = window.scrollY;

// Show/hide on scroll
if (scrollTop > lastScrollTop && scrollTop > 100) {
header.style.top = "-100px"; // hide
} else {
header.style.top = "0"; // show
}

// Shrink logo after 100px
if (scrollTop > 100) {
header.classList.add("shrink");
} else {
header.classList.remove("shrink");
}

lastScrollTop = scrollTop;
});