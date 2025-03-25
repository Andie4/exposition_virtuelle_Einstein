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





document.addEventListener("DOMContentLoaded", () => {
    const langueButton = document.querySelector('.langues');

    if (langueButton) {
        langueButton.addEventListener("click", () => {
            const currentLang = window.location.href.includes('/english/') ? 'en' : 'fr';
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            langueButton.textContent = newLang === 'fr' ? 'Fr' : 'En';

            // Récupérer l'URL actuelle sans le protocole et le domaine (chemin relatif)
            let currentPath = window.location.pathname;
            console.log('Chemin actuel:', currentPath);

            // Si l'URL contient "english", nous allons supprimer cette partie pour passer à la langue opposée
            const newPath = currentPath.includes('/english/')
                ? currentPath.replace('/english/', '/')
                : currentPath.replace(window.location.pathname, `/english${window.location.pathname}`);

            // Reconstituer l'URL complète
            const newUrl = window.location.origin + newPath;
            console.log('Nouvelle URL:', newUrl);

            // Rediriger vers la nouvelle URL
            window.location.replace(newUrl);
        });
    }
});

