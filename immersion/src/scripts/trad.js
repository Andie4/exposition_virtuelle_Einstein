document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('language-selector');
    const savedLanguage = localStorage.getItem('language') || 'fr';

    if (languageSelector) {
        languageSelector.value = savedLanguage;

        languageSelector.addEventListener('change', (event) => {
            const selectedLang = event.target.value;
            localStorage.setItem('language', selectedLang);
            loadLanguage(selectedLang);
        });
    }

    // Charger la langue enregistrée au démarrage
    loadLanguage(savedLanguage);
    function loadLanguage(lang) {
        fetch(`trad/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                document.querySelectorAll('[data-translate-key]').forEach(element => {
                    const key = element.getAttribute('data-translate-key');
                    if (translations[key]) {
                        element.innerHTML = translations[key]; 
                    }
                });

                document.querySelector('html').lang = lang;
            })
            .catch(error => console.error("Erreur de chargement de la langue :", error));
    }
});
