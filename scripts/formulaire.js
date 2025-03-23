"use strict"




//-----------------------------------------------------

// ! Boutons horaires

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".buttons button");
    const selectedTimeInput = document.getElementById("selectedTime");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");
            selectedTimeInput.value = this.getAttribute("data-time");
        });
    });
});

//-----------------------------------------------------

// ! Vérification des infos du formulaire
// TODO : ResaWeb à modifier

// Variable pour vérifier que les infos obligatoires sont données et correct avant de passé à la page suivante
var pageValide = 'False';



// ! Réservation

const boutonResa = document.querySelector(".resaButton")

boutonResa.addEventListener("click", function () {
    //* Stockage des informations

    // Date
    var parts = document.querySelector("#date").value.split("-");
    var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
    localStorage.setItem('date', formattedDate);


    // Horaire
    
    var horaireValue = document.querySelector("#selectedTime").value;
    localStorage.setItem("horaire", horaireValue);

    //* Vérification Champs obligatoire
    if (document.querySelector("#date").value == "" || document.querySelector("#selectedTime").value == "") {
        alert('Tous les champs sont obligatoires, veuillez vérifier que vous les avez tous remplis.');
        pageValide = 'False';
    } else {
        pageValide = 'True';
    }
});



// ! Billets
const boutonBillets = document.querySelector(".billetsButton")



boutonBillets.addEventListener("click", function () {
    let totalBillets = 0;
    let billetsValides = true;

    // Récupérer tous les compteurs de billets
    document.querySelectorAll('.counter span').forEach(span => {
        totalBillets += parseInt(span.textContent);
    });

    if (totalBillets <= 0) {
        alert('Il doit y avoir au moins 1 billet pour continuer.');
        pageValide = 'False';
        return;
    }

    if (totalBillets > 10) {
        alert('Le nombre maximum de billets par réservation est de 10.');
        pageValide = 'False';
        return;
    }

    // Vérifier que chaque billet a un nom et prénom rempli correctement
    document.querySelectorAll('.infosBillet').forEach(input => {
        if (input.value.trim() === '') {
            billetsValides = false;
        }

        // Vérification des espaces et caractères spéciaux
        if (/[^a-zA-ZÀ-ÿ\s-]/.test(input.value.trim())) {
            billetsValides = false;
            alert('Les champs nom et prénom doivent contenir uniquement des lettres, des espaces et des tirets.');
            input.focus();
            return;
        }

        if (input.value.trim().length !== input.value.length) {
            billetsValides = false;
            alert('Les champs nom et prénom ne peuvent pas contenir que des espaces.');
            input.focus();
            return;
        }
    });

    if (!billetsValides) {
        pageValide = 'False';
        return;
    }

    // Si tout est bon, la page est valide et on peut passer à l'étape suivante
    pageValide = 'True';
});




// ! Coordonnées
const boutonUser = document.querySelector(".userButton")

boutonUser.addEventListener("click", function (event) {
  // Stockage des informations
  localStorage.setItem('nom', document.querySelector("#nom").value);
  localStorage.setItem('prenom', document.querySelector("#prenom").value);
  localStorage.setItem('mail', document.querySelector("#email").value);
  
  // Vérifie que les champs nom et prénom ne contiennent pas que des espaces
  if (localStorage.getItem('nom').trim() == '' || localStorage.getItem('prenom').trim() == '') {
    alert('Les champs nom et prenom ne peuvent pas contenir que des espaces, veuillez rentrer des caractères valides.');
    event.preventDefault();

  }
  // Vérifie si une chaîne contient des chiffres
  // 1.b si le fichier contient des expressions régulières ou du code de traitement des chaines de caractères
  else if (!/^[a-zA-ZÀ-ÿ -]+$/.test(localStorage.getItem('nom')) || !/^[a-zA-ZÀ-ÿ -]+$/.test(localStorage.getItem('prenom'))) {
    alert('Les champs nom et prenom ne peuvent que lettres alphabétiques (majuscules et minuscules) et le symbole "-"')
    event.preventDefault();
  }
});


//-----------------------------------------------------
//! Slider

// Variables
const boutonsNext = document.querySelectorAll(".button-next");
const boutonsBefore = document.querySelectorAll(".button-before");
const fieldsets = document.querySelector(".slider-content");
var position = 0;
var image = 0;


// Événement 
boutonsNext.forEach(function (bouton) {
    bouton.addEventListener("click", decaleGauche);
})
boutonsBefore.forEach(function (bouton) {
    bouton.addEventListener("click", decaleDroite);
})

// Fonction de déplacement
function decaleGauche() {
    if (pageValide == 'True') {
        position -= 800
        image += 1
        fieldsets.style.left = position + "px"
    }

};

function decaleDroite() {
    position += 800
    image -= 1
    fieldsets.style.left = position + "px"
};

//-----------------------------------------------------
//!  Billets

// Sélectionner tous les boutons avec la classe "ajouter" et "supprimer"
const addBillet = document.querySelectorAll('.ajouter');
const deleteBillet = document.querySelectorAll('.supprimer');

// Ajout de billet
addBillet.forEach((button) => {
    button.addEventListener('click', function () {
        event.preventDefault(); // Empêche la soumission du formulaire je vais devoir les remettre pour le fonctionnement du form une fois que j'aurais mis les différentes étapes du slider dans des fielsets.

        let counterSpan = this.parentElement.querySelector('span');
        let count = parseInt(counterSpan.textContent);
        counterSpan.textContent = count + 1;

        //ajoute un nouveau billet à la catégorie
        const ticketCategory = this.closest('.ticket-category');
        let detailsDiv = ticketCategory.querySelector('.details');

        if (!detailsDiv) {
            detailsDiv = document.createElement('div');
            detailsDiv.classList.add('details');
            ticketCategory.appendChild(detailsDiv);
        }

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

        let counterSpan = this.parentElement.querySelector('span');
        let count = parseInt(counterSpan.textContent);

        if (count > 0) {
            counterSpan.textContent = count - 1;

            // Supprimer le dernier billet de la cat selectionné
            const ticketCategory = this.closest('.ticket-category');
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
