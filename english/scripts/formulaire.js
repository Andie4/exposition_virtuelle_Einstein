"use strict"

//-----------------------------------------------------
// Clear localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
    clearLocalStorage(); // Clear localStorage on page load
    updateRecap(); // Update the summary (if necessary)
});

//-----------------------------------------------------
// Function to clear localStorage
function clearLocalStorage() {
    localStorage.clear(); // Clears all data stored in localStorage
}


//-----------------------------------------------------
// ! Time buttons

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
// ! Form validation

var pageValide = 'False';

const boutonResa = document.querySelector(".resaButton");

boutonResa.addEventListener("click", function () {
    var parts = document.querySelector("#date").value.split("-");
    var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
    localStorage.setItem('date', formattedDate);

    var horaireValue = document.querySelector("#selectedTime").value;
    localStorage.setItem("horaire", horaireValue);

    if (document.querySelector("#date").value == "" || document.querySelector("#selectedTime").value == "") {
        alert('All fields are mandatory, please ensure that you have filled them all.');
        pageValide = 'False';
    } else {
        pageValide = 'True';
    }
    updateRecap(); // Update the summary after selecting the date and time
});

// ! Tickets
const boutonBillets = document.querySelector(".billetsButton");

boutonBillets.addEventListener("click", function () {
    saveBilletsToLocalStorage(); // Save tickets on "Next" click

    let totalBillets = 0;
    let billetsValides = true;

    document.querySelectorAll('.counter span').forEach(span => {
        totalBillets += parseInt(span.textContent);
    });

    if (totalBillets <= 0) {
        alert('At least 1 ticket must be added to proceed.');
        pageValide = 'False';
        return;
    }

    if (totalBillets > 10) {
        alert('The maximum number of tickets per reservation is 10.');
        pageValide = 'False';
        return;
    }

    document.querySelectorAll('.infosBillet').forEach(input => {
        if (input.value.trim() === '') {
            billetsValides = false;
        }
        if (/[^a-zA-ZÀ-ÿ\s-]/.test(input.value.trim())) {
            billetsValides = false;
            alert('The name and surname fields must contain only letters, spaces, and hyphens.');
            input.focus();
            return;
        }
        if (input.value.trim().length !== input.value.length) {
            billetsValides = false;
            alert('The name and surname fields cannot contain only spaces.');
            input.focus();
            return;
        }
    });

    if (!billetsValides) {
        pageValide = 'False';
        return;
    }

    pageValide = 'True';
    updateRecap(); // Update the summary after selecting the tickets
});


//-----------------------------------------------------
// Function to update the summary
function updateRecap() {
    const recapDiv = document.querySelector('.ticket .ticketInfos');

    // Retrieve information from localStorage
    const date = localStorage.getItem('date');
    const horaire = localStorage.getItem('horaire');
    const billets = getBilletsCount();
    const responsable = getResponsableInfos();

    // Update the summary
    recapDiv.innerHTML = `
        <p>Reservation Date: ${date || "Not specified"}</p>
        <p>Time: ${horaire || "Not specified"}</p>
        <p>Number of tickets: ${billets || "0"}</p>
        <p>Booking Responsible: ${responsable || "Not specified"}</p>
    `;
}

// Function to get the total number of tickets
function getBilletsCount() {
    let totalBillets = 0;
    document.querySelectorAll('.counter span').forEach(span => {
        totalBillets += parseInt(span.textContent);
    });
    return totalBillets;
}

// Function to get the booking responsible info
function getResponsableInfos() {
    const nomResponsable = document.querySelector('#nom') ? document.querySelector('#nom').value : '';
    const prenomResponsable = document.querySelector('#prenom') ? document.querySelector('#prenom').value : '';
    const emailResponsable = document.querySelector('#email') ? document.querySelector('#email').value : '';

    if (nomResponsable && prenomResponsable && emailResponsable) {
        return `${nomResponsable} ${prenomResponsable} (${emailResponsable})`;
    }
    return '';
}

// Update the summary on the initial page load
document.addEventListener("DOMContentLoaded", updateRecap);


//-----------------------------------------------------
//! Slider

const boutonsNext = document.querySelectorAll(".button-next");
const boutonsBefore = document.querySelectorAll(".button-before");
const fieldsets = document.querySelector(".slider-content");
var position = 0;
var step = 600;  // Initial value of `step`, adjust if necessary.
var image = 0;

// Function to get the width of the slider
function getSliderWidth() {
    const slider = document.querySelector(".slider");
    return parseInt(window.getComputedStyle(slider).width);  // Returns the width without units
}

// Update `step` when the window is resized
window.addEventListener("resize", function() {
    step = getSliderWidth();
});

// Initialize the value of `step`
step = getSliderWidth();

// Add event listeners for the buttons
boutonsNext.forEach(function (bouton) {
    bouton.addEventListener("click", decaleGauche);
});

boutonsBefore.forEach(function (bouton) {
    bouton.addEventListener("click", decaleDroite);
});

// Function to move the slider left
function decaleGauche() {
    if (pageValide == 'True') {
        position -= step;
        image += 1;
        fieldsets.style.left = position + "px";

        if (image === 2) { // Assuming the pricing page is at index 2
            fetchTarifs();
        }
    }
}

// Function to move the slider right
function decaleDroite() {
    if (pageValide == 'True') {
        position += step;
        image -= 1;
        fieldsets.style.left = position + "px";
    }
}


//-----------------------------------------------------
function loadBilletsFromLocalStorage() {
    let billets = JSON.parse(localStorage.getItem("billets")) || [];

    billets.forEach(({ tarif, personnes }) => {
        const ticketCategory = document.querySelector(`.ticket-category[data-id="${tarif}"]`);

        if (ticketCategory) {
            const counterSpan = ticketCategory.querySelector('.counter span');
            counterSpan.textContent = personnes.length; // Update the counter

            let detailsDiv = ticketCategory.querySelector('.details');
            if (!detailsDiv) {
                detailsDiv = document.createElement('div');
                detailsDiv.classList.add('details');
                ticketCategory.appendChild(detailsDiv);
            }

            personnes.forEach(({ nom, prenom }, index) => {
                const newBillet = document.createElement('div');
                newBillet.classList.add('person');
                newBillet.innerHTML = `
                    <p class="tarif">Ticket ${index + 1}</p>
                    <div class="blocInfosBillet">
                        <div class="groupeInfosBillet">
                            <label for="nom" class="padding">Last name</label>
                            <input type="text" required class="infosBillet" value="${nom}"><br>
                        </div>
                        <div class="groupeInfosBillet">
                            <label for="prenom" class="padding">First name</label>
                            <input type="text" required class="infosBillet" value="${prenom}">
                        </div>
                    </div>
                `;
                detailsDiv.appendChild(newBillet);
            });
        }
    });
}

async function fetchTarifs() {
    try {
        const response = await fetch('https://albert.xploria.fr/api/tarif');
        const data = await response.json();

        generateTarifs(data);

        // Reload tickets once the prices are displayed
        loadBilletsFromLocalStorage();
    } catch (error) {
        console.error('Error loading pricing:', error);
    }
}



function generateTarifs(tarifs) {
    const container = document.querySelector('.tarif-container');
    container.innerHTML = '';

    if (tarifs.length === 0) {
        const noTarifsMessage = document.createElement('p');
        noTarifsMessage.textContent = 'No pricing available';
        container.appendChild(noTarifsMessage);
        return;
    }

    tarifs.forEach(tarif => {
        const ticketCategoryDiv = document.createElement('div');
        ticketCategoryDiv.classList.add('ticket-category');
        ticketCategoryDiv.setAttribute('data-id', tarif.id_tarif); // Associate the pricing id

        ticketCategoryDiv.innerHTML = `
            <div class="flex">
                <label class="tarif">${tarif.name_tarif}</label>
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


// Call fetchTarifs function to retrieve and display the prices
fetchTarifs();

function saveBilletsToLocalStorage() {
    let billets = [];

    document.querySelectorAll(".ticket-category").forEach((ticket) => {
        const tarifBillet = ticket.getAttribute("data-id");
        const billetsData = [];

        ticket.querySelectorAll(".details .person").forEach((billet) => {
            const nomBillet = billet.querySelector(".groupeInfosBillet:nth-of-type(1) .infosBillet")?.value.trim() || "";
            const prenomBillet = billet.querySelector(".groupeInfosBillet:nth-of-type(2) .infosBillet")?.value.trim() || "";

            billetsData.push({ nom: nomBillet, prenom: prenomBillet });
        });

        if (billetsData.length > 0) {
            billets.push({ tarif: tarifBillet, personnes: billetsData });
        }
    });

    localStorage.setItem("billets", JSON.stringify(billets));
}

function addEventListeners() {
    const addBillet = document.querySelectorAll('.ajouter');
    const deleteBillet = document.querySelectorAll('.supprimer');

    addBillet.forEach((button) => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            let counterSpan = this.parentElement.querySelector('span');
            let count = parseInt(counterSpan.textContent);

            if (count < 10) {
                counterSpan.textContent = count + 1;

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
                    <p class="tarif">Ticket ${count + 1}</p>
                    <div class="blocInfosBillet">
                        <div class="groupeInfosBillet">
                            <label for="nom" class="padding">Last Name</label>
                            <input type="text" required class="infosBillet"><br>
                        </div>
                        <div class="groupeInfosBillet">
                            <label for="prenom" class="padding">First Name</label>
                            <input type="text" required class="infosBillet">
                        </div>
                    </div>
                `;
                detailsDiv.appendChild(newBillet);
            } else {
                alert('The maximum number of tickets per reservation is 10.');
            }

            saveBilletsToLocalStorage(); // Save in localStorage
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

            saveBilletsToLocalStorage(); // Update localStorage
        });
    });
}
