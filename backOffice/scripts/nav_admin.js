const menuBurger = document.querySelector('.menu-burger');
const navLinks = document.querySelector('.nav-links');
const closeIcon = document.querySelector('.close');


menuBurger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-menu');
    menuBurger.classList.toggle('active');
    closeIcon.classList.toggle('active');
});

closeIcon.addEventListener('click', () => {
    navLinks.classList.remove('mobile-menu');
    menuBurger.classList.remove('active');
    closeIcon.classList.remove('active');
});


