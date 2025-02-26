"use strict"

// * Sommaire : 

// Alert perte infos formulaire (1.c : rÃ¨gle 88)
// VÃ©rification des infos du formulaire (1.c : rÃ¨gle 77) + (1.b)
// RÃ©capitulatif de la rÃ©servation (1.c : rÃ¨gle 81)
// DÃ©tection adresse mail temporaire (1.a)
// Affiche formulaire 1 page : Slider (1.c : rÃ¨gle 89)
// Choix de boissons dans le formulaire


//-----------------------------------------------------


// ! Alert perte infos formulaire
// ! RÃ¨gle opquast 88


window.addEventListener('beforeunload', function (e) {
  if (document.querySelector("#nom").value !== "" || document.querySelector("#prenom").value !== "" || document.querySelector("#mail").value !== "") {
    var message = "Les donnÃ©es ne seront pas enregistrÃ©es si vous quittez cette page";
    e.preventDefault();
    return message;
  };
});





//-----------------------------------------------------

// ! VÃ©rification des infos du formulaire
// ! RÃ¨gle opquast 77 

// Variable pour vÃ©rifier que les infos obligatoires sont donnÃ©es et correct avant de passÃ© Ã  la page suivante
var pageValide = 'False';

// ! User
const boutonUser = document.querySelector(".userButton")

boutonUser.addEventListener("click", function () {
  // Stockage des informations
  localStorage.setItem('nom', document.querySelector("#nom").value);
  localStorage.setItem('prenom', document.querySelector("#prenom").value);
  localStorage.setItem('mail', document.querySelector("#mail").value);
  // VÃ©rification Champs Obligatoire
  if (localStorage.getItem('nom') == "" || localStorage.getItem('prenom') == "" || localStorage.getItem('mail') == "") {
    if (localStorage.getItem('nom') == "") {
      alert('Veuillez remplir le champs nom');
      return false;
    } else if (localStorage.getItem('prenom') == "") {
      alert('Veuillez remplir le champ prenom');
      return false;
    } else if (localStorage.getItem('mail') == "") {
      alert('Veuillez remplir le champs mail');
      return false;
    }
    pageValide = 'False';
  }
  // Verifie que le mail contient @ et .
  else if (!localStorage.getItem('mail').includes('@') || !localStorage.getItem('mail').includes('.')) {
    alert('Veuillez remplir le champs mail avec un mail valide (doit correspondre au format du mail)');
    pageValide = 'False';
  }
  // VÃ©rifie que les champs nom et prÃ©nom ne contiennent pas que des espaces
  else if (localStorage.getItem('nom').trim() == '' || localStorage.getItem('prenom').trim() == '') {
    alert('Les champs nom et prenom ne peuvent pas contenir que des espaces, veuillez rentrer des caractÃ¨res valides.');
    pageValide = 'False';
  }
  // VÃ©rifie si une chaÃ®ne contient des chiffres
  // 1.b si le fichier contient des expressions rÃ©guliÃ¨res ou du code de traitement des chaines de caractÃ¨res
  else if (!/^[a-zA-ZÃ€-Ã¿ -]+$/.test(localStorage.getItem('nom')) || !/^[a-zA-ZÃ€-Ã¿ -]+$/.test(localStorage.getItem('prenom'))) {
    alert('Les champs nom et prenom ne peuvent que lettres alphabÃ©tiques (majuscules et minuscules) et le symbole "-"')
    pageValide = 'False';

  } else {
    manualVerifMail(localStorage.getItem('mail'));
    // console.log("all good");
  }
});


// ! RÃ©servation

const boutonResa = document.querySelector(".resaButton")

boutonResa.addEventListener("click", function () {
  //* Stockage des informations
  // RÃ©cupÃ¨re l'option actuellement sÃ©lectionnÃ©e dans le <select> en utilisant son index sÃ©lectionnÃ©.
  var selectSalle = document.querySelector("#salle");
  var salleOption = selectSalle.options[selectSalle.selectedIndex];
  localStorage.setItem('salle', salleOption.innerHTML);
  // Date
  var parts = document.querySelector("#date").value.split("-");
  var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
  localStorage.setItem('date', formattedDate);
  // Horaire
  var selectHoraire = document.querySelector("#horaire");
  var horaireOption = selectHoraire.options[selectHoraire.selectedIndex];
  localStorage.setItem('horaire', horaireOption.innerHTML);
  // DurÃ©e
  var selectDuree = document.querySelector("#duree");
  var dureeOption = selectDuree.options[selectDuree.selectedIndex];
  localStorage.setItem('duree', dureeOption.innerHTML);
  // Participant
  localStorage.setItem('participant', document.querySelector("#participant").value);

  //* VÃ©rification Champs obligatoire
  if (localStorage.getItem('salle') == "Choisir une salle" || localStorage.getItem('date') == "" || localStorage.getItem('horaire') == "" || localStorage.getItem('duree') == "" || localStorage.getItem('participant') == "") {
    alert('Tous les champs sont obligatoires, veuillez vÃ©rifier que vous les avez tous remplis.');
    pageValide = 'False';
  } else {
    pageValide = 'True';
  } if (parseInt(localStorage.getItem('participant')) <= 0) {
    pageValide = 'False';
    alert('Il doit y avoir au moins 1 personne pour faire une rÃ©servation');
  } if (parseInt(localStorage.getItem('participant')) > 10) {
    pageValide = 'False';
    alert('Le maximum de personnes pour une rÃ©servation est 10');
  }
});

// ! Boissons
const boutonDrink = document.querySelector(".drinkButton")

boutonDrink.addEventListener("click", function () {
  // remise Ã  0 des variables
  var boissons = [];
  var quantites = [];
  var i = 0
  // RÃ©cupÃ©ration des boissons
  document.querySelectorAll(".choixBoisson").forEach(function (boisson) {
    var boissonOption = boisson.options[boisson.selectedIndex];
    boissons[i] = boissonOption.innerHTML;
    i++;
  })
  i = 0
  // RÃ©cupÃ©ration des quantitÃ©s
  document.querySelectorAll(".quantite").forEach(function (quantite) {
    quantites[i] = quantite.value;
    i++;
  })
  i = 0

  localStorage.setItem('boissons', JSON.stringify(boissons));
  localStorage.setItem('quantite', JSON.stringify(quantites));

  // VÃ©rification du bon remplissage des champs
  var champsCheck = 0
  if (boissons[0] == "Choisir une boisson" & quantites[0] == "" & boissons.length == 1) {
    pageValide = 'True';
    recapitulatif()
  } else {
    while (i < boissons.length) {
      if (boissons[i] == "Choisir une boisson" || quantites[i] == "") {
        pageValide = 'False';
        alert('Chaque choix de boissons doit avoir une boisson sÃ©lÃ©ctionnÃ©e et une quantitÃ©, sinon retirez la boisson');
        return false;
      } else if (boissons[i - 1] == boissons[i]) {
        pageValide = 'False';
        alert('Veuillez rÃ©unir les mÃªme boissons dans un seul champs');
      } if (quantites[i] <= 0) {
        pageValide = 'False';
        alert('Il doit y avoir au moins 1 boisson pour faire une commande');
      } else if (quantites[i] > 10) {
        pageValide = 'False';
        alert('Veuillez commander moins de boisson. Le maximum autoriser en une commande est 10');
      } else {
        champsCheck++;
      }
      i++;
    };
    if (champsCheck == boissons.length) {
      pageValide = 'True';
      recapitulatif()
    }

  };


});


//-----------------------------------------------------

//  ! RÃ©capitulatif de la rÃ©servation
// ! RÃ¨gle opquast 81
const pageRecap = document.querySelector(".recap");


function recapitulatif() {
  pageRecap.innerHTML = '<div><legend>RÃ©capitulatif</legend>'
    + '<p><strong>Vos informations : </strong>' + localStorage.getItem('prenom') + " " + localStorage.getItem('nom') + '</p>'
    + '<p><strong>Adresse mail : </strong>' + localStorage.getItem('mail') + '</p>'

    + '<p><strong>La salle : </strong>' + localStorage.getItem('salle') + '</p>'
    + '<p><strong>RÃ©servation : </strong> le ' + localStorage.getItem('date') + ' Ã  ' + localStorage.getItem('horaire') + ' pour ' + localStorage.getItem('duree') + '</p>'
    + '<p><strong>Nombre de personne.s : </strong>' + localStorage.getItem('participant') + '</p></div>'


    + afficheBoissonRecap()

    + '<span><input type="button" class="button-before button-style small-button" id="before-recap" value="PrÃ©cÃ©dent">'
    + '<input type="submit" name="bouton_soumettre" class="button-style small-button" id="envoyer" value="Envoyer ->"></span>';
  document.querySelector("#before-recap").addEventListener("click", decaleDroite);

};

function afficheBoissonRecap() {
  var boissons = JSON.parse(localStorage.getItem('boissons'));
  var quantites = JSON.parse(localStorage.getItem('quantite'));
  var boissonHTML = ''
  if (boissons[0] !== "Choisir une boisson" & quantites[0] !== "x") {
    boissonHTML = '<div><p><strong>Les boissons : </strong></p><p>'
    for (let i = 0; i < boissons.length; i++) {
      boissonHTML += '<p>' + boissons[i] + ' x ' + quantites[i] + '</p></div>';
    };
  };
  return boissonHTML;
}


//-----------------------------------------------------
// 1.a si le fichier contient du code relatif Ã  l'interactivitÃ© dans le(s) formulaire(s), notamment pour la dÃ©tection dâ€™adresses de courriel temporaires

// ! DÃ©tection adresse mail temporaire


// Liste des nom de domaine d'adresse mail temporaire
var mailTempo = ["uooos.com", "doolk.com", "nthrw.com", "bbitq.com", "ckptr.com", "alldrys.com", "moabuild.com", "moongit.com", "20minutemail.it", "diolang.com", "aosod.com", "huleos.com", "sharklasers.com", "guerrillamail.info", "grr.la", "guerrillamail.biz", "guerrillamail.com", "guerrillamail.de", "guerrillamail.net", "guerrillamail.org", "guerrillamailblock.com", "pokemail.net", "spam4.me", "musiccode.me", "lyricspad.net", "citmo.net", "vusra.com", "gufum.com", "best-john-boats.com", "pirolsnet.com", "trickyfucm.com", "entipat.com", "smartinbox.online", "goonby.com", "plexfirm.com", "neixos.com", "10mail.org", "firste.ml", "zeroe.ml", "dropmail.me", "vintomaper.com", "labworld.org", "fillallin.com", "dockleafs.com", "mailsac.com", "mails.omvvim.edu.in", "onetimeusemail.com", "midiharmonica.com", "fthcapital.com", "yopmail.com", "crazymailing.com", "exbts.com", "wemel.site", "mybx.site", "emeil.top", "mywrld.top", "matra.top", "memsg.site", "mybx.site", "emailnax.com", "emailbbox.pro", "inboxbear.com", "getnada.com", "guysmail.com", "guysmail.com", "trashmail.fr", "trashmail.se", "my10minutemail.com"]

function manualVerifMail(mail) {
  var positionArobase = mail.indexOf("@");
  var urlMail = mail.substring(positionArobase + 1, mail.length);

  var i = 0;
  while (i < mailTempo.length) {
    if (urlMail == mailTempo[i]) {
      console.log(mailTempo[i]);
      console.log("mail pas valide")
      pageValide = 'False';
      alert("L'adresse mail n'est pas conforme, les adresses mails temporaires ne sont pas acceptÃ©es ")
    } else {
      pageValide = 'True';
    }
    i++;
  }
};



// API pas 100% fiable 

// function verifMail(mail) {
// console.log(mail);
//   fetch("https://disposable.debounce.io/?email=" + mail).then(function (response) {
//     response.json().then(function (data) {
//       console.log("RÃ©ponse reÃ§ue : ");
//       console.log(data);
//     });
//   });
// };



//-----------------------------------------------------
//!  Affiche formulaire 1 page : Slider
// ! RÃ¨gle opquast 89

// Variables
const boutonsNext = document.querySelectorAll(".button-next");
const boutonsBefore = document.querySelectorAll(".button-before");
const photos = document.querySelector(".slider-content");
var position = 0;
var image = 0;
var compteur = 0;


// Ã‰vÃ©nement 
boutonsNext.forEach(function (bouton) {
  bouton.addEventListener("click", decaleGauche);
})
boutonsBefore.forEach(function (bouton) {
  bouton.addEventListener("click", decaleDroite);
})

// Fonction de dÃ©placement
function decaleGauche() {
  if (pageValide == 'True') {
    position -= 500
    image += 1
    photos.style.left = position + "px"
  }

};

function decaleDroite() {
  position += 500
  image -= 1
  photos.style.left = position + "px"
};


// ----------------------------------------------------
// ! Choix de boissons dans le formulaire


// Variables
const formBoisson = document.querySelector(".form-boisson");
const boutonAdd = document.querySelector(".add-drink");
const boutonsRemove = document.querySelectorAll(".remove-drink");

boutonAdd.addEventListener("click", ajouterBoisson);


function ajouterBoisson() {
  const boissonsDiv = document.getElementById('boissons');
  const nouvelleBoisson = document.createElement('div');
  const boisson1 = document.querySelector(".boisson");
  nouvelleBoisson.classList.add('boisson-container');
  nouvelleBoisson.innerHTML = boisson1.innerHTML + ` <button type="button" class="remove-drink button-style small-button" >Retirer</button>`;
  boissonsDiv.appendChild(nouvelleBoisson);
  // Ajout de l'Ã©vÃ©nement de retrait au nouveau bouton "Retirer"
  nouvelleBoisson.querySelector('.remove-drink').addEventListener('click', function () {
    retirerBoisson(this);
  });
};


function retirerBoisson(button) {
  const boissonContainer = button.closest('.boisson-container');
  if (boissonContainer) {
    boissonContainer.remove();
  }
};



// -------------------------------------------------------------------------------------------------------------------------