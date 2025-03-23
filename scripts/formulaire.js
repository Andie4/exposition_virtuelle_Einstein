"use strict"

//-----------------------------------------------------
// Vider le localStorage au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    clearLocalStorage(); // Effacer localStorage au chargement
    updateRecap(); // Mettre à jour le récapitulatif (si nécessaire)
});

//-----------------------------------------------------
// Fonction pour vider le localStorage
function clearLocalStorage() {
    localStorage.clear(); // Efface toutes les données stockées dans le localStorage
}


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

var pageValide = 'False';

const boutonResa = document.querySelector(".resaButton");

boutonResa.addEventListener("click", function () {
    var parts = document.querySelector("#date").value.split("-");
    var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
    localStorage.setItem('date', formattedDate);

    var horaireValue = document.querySelector("#selectedTime").value;
    localStorage.setItem("horaire", horaireValue);

    if (document.querySelector("#date").value == "" || document.querySelector("#selectedTime").value == "") {
        alert('Tous les champs sont obligatoires, veuillez vérifier que vous les avez tous remplis.');
        pageValide = 'False';
    } else {
        pageValide = 'True';
    }
    updateRecap(); // Mettre à jour le récapitulatif après la sélection de la date et de l'heure
});

// ! Billets
const boutonBillets = document.querySelector(".billetsButton");

boutonBillets.addEventListener("click", function () {
    let totalBillets = 0;
    let billetsValides = true;

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

    document.querySelectorAll('.infosBillet').forEach(input => {
        if (input.value.trim() === '') {
            billetsValides = false;
        }
        if (/[^a-zA-ZÀ-ÿ\s-]/.test(input.value.trim())) {
            billetsValides = false;
            alert('Les champs nom et prénom doivent contenir uniquement des lettres, des espaces et des tirets.');
            input.focus();
            return;
        }
        if (input.value.trim().length !== input.value.length) {
            billetsValides = false;
            alert('Les champs nom et prénom ne peuvent contenir que des espaces.');
            input.focus();
            return;
        }
    });

    if (!billetsValides) {
        pageValide = 'False';
        return;
    }

    pageValide = 'True';
    updateRecap(); // Mettre à jour le récapitulatif après la sélection des billets
});

//-----------------------------------------------------
// Fonction pour mettre à jour le récapitulatif
function updateRecap() {
    const recapDiv = document.querySelector('.ticket .ticketInfos');

    // Récupérer les informations depuis localStorage
    const date = localStorage.getItem('date');
    const horaire = localStorage.getItem('horaire');
    const billets = getBilletsCount();
    const responsable = getResponsableInfos();

    // Mettre à jour le récapitulatif
    recapDiv.innerHTML = `
        <p>Date de réservation : ${date || "Non spécifiée"}</p>
        <p>Horaire : ${horaire || "Non spécifié"}</p>
        <p>Nombre de billets : ${billets || "0"}</p>
        <p>Responsable de réservation : ${responsable || "Non spécifié"}</p>
    `;
}

// Fonction pour obtenir le nombre total de billets
function getBilletsCount() {
    let totalBillets = 0;
    document.querySelectorAll('.counter span').forEach(span => {
        totalBillets += parseInt(span.textContent);
    });
    return totalBillets;
}

// Fonction pour obtenir les informations du responsable
function getResponsableInfos() {
    const nomResponsable = document.querySelector('#nom') ? document.querySelector('#nom').value : '';
    const prenomResponsable = document.querySelector('#prenom') ? document.querySelector('#prenom').value : '';
    const emailResponsable = document.querySelector('#email') ? document.querySelector('#email').value : '';
    
    if (nomResponsable && prenomResponsable && emailResponsable) {
        return `${nomResponsable} ${prenomResponsable} (${emailResponsable})`;
    }
    return '';
}

// Mettre à jour le récapitulatif au chargement initial de la page
document.addEventListener("DOMContentLoaded", updateRecap);


//-----------------------------------------------------
//! Slider

const boutonsNext = document.querySelectorAll(".button-next");
const boutonsBefore = document.querySelectorAll(".button-before");
const fieldsets = document.querySelector(".slider-content");
var position = 0;
var image = 0;

boutonsNext.forEach(function (bouton) {
    bouton.addEventListener("click", decaleGauche);
})
boutonsBefore.forEach(function (bouton) {
    bouton.addEventListener("click", decaleDroite);
})

function decaleGauche() {
    if (pageValide == 'True') {
        position -= 800;
        image += 1;
        fieldsets.style.left = position + "px";

        if (image === 2) { // Supposons que la page des tarifs soit à l'index 2
            fetchTarifs();
        }
    }
};

function decaleDroite() {
    position += 800;
    image -= 1;
    fieldsets.style.left = position + "px";
};

//-----------------------------------------------------

async function fetchTarifs() {
    try {
        const response = await fetch('https://albert.xploria.fr/api/tarif');
        const data = await response.json();

        generateTarifs(data);
    } catch (error) {
        console.error('Erreur lors du chargement des tarifs:', error);
    }
}

function generateTarifs(tarifs) {
    const container = document.querySelector('.tarif-container');
    container.innerHTML = '';

    if (tarifs.length === 0) {
        const noTarifsMessage = document.createElement('p');
        noTarifsMessage.textContent = 'Aucun tarif disponible';
        container.appendChild(noTarifsMessage);
        return;
    }

    tarifs.forEach(tarif => {
        const ticketCategoryDiv = document.createElement('div');
        ticketCategoryDiv.classList.add('ticket-category');
        ticketCategoryDiv.setAttribute('data-id', tarif.id_tarif); // Associer l'id du tarif

        ticketCategoryDiv.innerHTML = `
            <div class="flex">
                <label class="tarif">${tarif.nom_tarif}</label>
                <div class="counter">
                    <button class="supprimer">-</button>
                    <span>0</span>
                    <button class="ajouter">+</button>
                </div>
            </div>
        `;

        container.appendChild(ticketCategoryDiv);
    });

    addEventListeners();
}


// Appeler la fonction fetchTarifs pour récupérer et afficher les tarifs
fetchTarifs();


// Ajouter des écouteurs d'événements pour les boutons + et -
function addEventListeners() {
    const addBillet = document.querySelectorAll('.ajouter');
    const deleteBillet = document.querySelectorAll('.supprimer');

    addBillet.forEach((button) => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
    
            // Calculer le total des billets avant l'ajout
            let totalBillets = 0;
            document.querySelectorAll('.counter span').forEach(span => {
                totalBillets += parseInt(span.textContent);
            });
    
            // Si le total est inférieur à 10, ajouter un billet
            if (totalBillets < 10) {
                let counterSpan = this.parentElement.querySelector('span');
                let count = parseInt(counterSpan.textContent);
                counterSpan.textContent = count + 1;
    
                const ticketCategory = this.closest('.ticket-category');
                const tarifId = ticketCategory.getAttribute('data-id');  // Récupérer l'id du tarif
                let detailsDiv = ticketCategory.querySelector('.details');
    
                if (!detailsDiv) {
                    detailsDiv = document.createElement('div');
                    detailsDiv.classList.add('details');
                    ticketCategory.appendChild(detailsDiv);
                }
    
                const newBillet = document.createElement('div');
                newBillet.classList.add('person');
                newBillet.innerHTML = `
                    <p class="tarif">Billet ${count + 1}</p>
                    <div class="blocInfosBillet">
                        <div class="groupeInfosBillet">
                            <label for="nom" class="padding">Nom</label>
                            <input type="text" required class="infosBillet"><br>
                        </div>
                        <div class="groupeInfosBillet">
                            <label for="prenom" class="padding">Prénom</label>
                            <input type="text" required class="infosBillet">
                        </div>
                    </div>
                `;
                detailsDiv.appendChild(newBillet);
            } else {
                alert('Le nombre maximum de billets par réservation est de 10.');
            }
        });
    });
    

    deleteBillet.forEach((button) => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            let counterSpan = this.parentElement.querySelector('span');
            let count = parseInt(counterSpan.textContent);

            if (count > 0) {
                counterSpan.textContent = count - 1;

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
}
