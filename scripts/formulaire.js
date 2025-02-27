

// Sélectionner tous les boutons avec la classe "ajouter" et "supprimer"
const addBillet = document.querySelectorAll('.ajouter');
const deleteBillet = document.querySelectorAll('.supprimer');

// Ajout de billet
addBillet.forEach((button) => {
    button.addEventListener('click', function () {
        event.preventDefault(); // Empêche la soumission du formulaire je vais devoir les remettre pour le fonctionnement du form une fois que j'aurais mis les différentes étapes du slider dans des fielsets.


        //ajoute un nouveau billet à la catégorie
        const newBillet = document.createElement('div');
        newBillet.classList.add('person');
        newBillet.innerHTML = `
        <p class="tarif">Billet ${count + 1}</p><div class="blocInfosBillet">
        <div class="groupeInfosBillet">
            <label for="nom" class="padding">Nom</label>
            <input type="text" required class="infosBillet"><br>
        </div>
        <div class="groupeInfosBillet">
            <label for="prenom" class="padding">Prénom</label>
            <input type="text" required  class="infosBillet">
        </div>
        `;
        detailsDiv.appendChild(newBillet);
    });
});

// suppression de billet
deleteBillet.forEach((button) => {
    button.addEventListener('click', function () {
        event.preventDefault(); // Empêche la soumission du formulaire je vais devoir les remettre pour le fonctionnement du form une fois que j'aurais mis les différentes étapes du slider dans des fielsets.


        let count = parseInt(counterSpan.textContent);

        if (count > 0) {
            counterSpan.textContent = count - 1;

            // Supprimer le dernier billet de la cat selectionné
            let detailsDiv = ticketCategory.querySelector('.details');

            if (detailsDiv) {
                const persons = detailsDiv.querySelectorAll('.person');
                if (persons.length > 0) {
                    persons[persons.length - 1].remove();
                }
                if (persons.length === 1) {
                    detailsDiv.remove();
                }
            }
        }
    });
});


"use strict"

