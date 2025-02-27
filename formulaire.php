<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/formulaire.css">
    <script src="scripts/formulaire.js" defer></script>
    <title>Réservation</title>
</head>
<body>
<?php include 'nav.php'; ?>


        <section>
        <div>
            <h1>Acheter un billet</h1>
            <!-- <div class="filAriane">
                <button>Dates & horaires ></button>
                <button>Nombre de billets ></button>
                <button>Coordonnées</button>
            </div> -->
        </div>
        

        <!-- Dates & horaires  -->
        <form action="">
            <div class="container">
                <div class="bigMarginBottom">
                    <h2 class="tinyMarginBottom">Dates & horaires</h2>
                    <p class="minuscule tinyMarginTop">Les champs suivis d'un <span class="red">*</span> sont obligatoires.</p>
                </div>

                <div class="bigMarginBottom">
                    <label for="date">Choisissez une date <span class="red">*</span></label><br>
                    <input type="date" id="date" class="date" required><br>
                </div>

                <div class="bigMarginBottom">
                    <label>Choisissez un horaire <span class="red">*</span></label>
                    <div class="buttons">
                        <button >10:00</button>
                        <button >11:00</button>
                        <button >12:00</button>
                        <button >14:00</button>
                        <button >15:00</button>
                        <button >16:00</button>
                        <button >17:00</button>
                        <button >18:00</button>
                    </div>
                </div>
                
                <button class="validate">Valider</button>
            </div>
        </form>

        <div class="ticket">
            <div class="pointilles">
                <img src="images/img_ticket.jpg" alt="">
                <div class="ticketInfos">
                    <p>Lorem ipsum dolor sit</p>
                    <p>Mode d'obtention : e-ticket (gratuit)</p>
                </div>
            </div>
        </div>



        <!-- Nombre de billets -->
        <form action="">
            <div class="container">
                <div class="bigMarginBottom">
                    <h2 class="tinyMarginBottom">Nombre de billets</h2>
                    <p class="minuscule tinyMarginTop">Les champs suivis d'un <span class="red">*</span> sont obligatoires.</p>
                </div>
                <div>
                <div class="">
        <div class="ticket-category">
            <div class="flex">
                <label class="tarif">Plein tarif</label>
                <div class="counter">
                    <button class="supprimer">-</button>
                    <span>0</span>
                    <button class="ajouter">+</button>
                </div>
            </div>
            <!-- <div class="details">
                <div class="person">
                    <label class="tarif">Plein tarif 1</label>
                    <input type="text" placeholder="Nom">
                    <input type="text" placeholder="Prénom">
                </div>

            </div> -->
        </div>
        
        <div class="ticket-category">
            <div class="flex">
                <label class="tarif">Enfant -16 ans</label>
                <div class="counter">
                    <button class="supprimer">-</button>
                    <span>0</span>
                    <button class="ajouter">+</button>
                </div>
            </div>
            
        </div>
            
        </div>
        
        <div class="ticket-category">
            <div class="flex">
                <label class="tarif">Jeune -26 ans</label>
                <div class="counter">
                    <button class="supprimer">-</button>
                    <span>0</span>
                    <button class="ajouter">+</button>
                </div>
            </div>
            
        </div>
        
        <div class="ticket-category">
            <div class="flex">
                <label class="tarif">Sénior +65 ans</label>
                <div class="counter">
                    <button class="supprimer">-</button>
                    <span>0</span>
                    <button class="ajouter">+</button>
                </div>
            </div>
            
        </div>
                
                <button class="validate">Valider</button>
            </div>
        </form>

        <div class="ticket">
            <div class="pointilles">
                <img src="images/img_ticket.jpg" alt="">
                <div class="ticketInfos">
                    <p>Lorem ipsum dolor sit</p>
                    <p>Mode d'obtention : e-ticket (gratuit)</p>
                </div>
            </div>
        </div>




        <!-- Coordonnées -->
        <form action="">
            <div class="container">
                <div class="bigMarginBottom">
                    <h2 class="tinyMarginBottom">Coordonnées</h2>
                    <p class="minuscule tinyMarginTop">Les champs suivis d'un <span class="red">*</span> sont obligatoires.</p>
                </div>
                <div>
                    <label for="nom">Nom <span class="red">*</span></label><br>
                    <input type="text" id="nom" class="nom" required><br>
                </div>
                <div>
                    <label for="prenom">Prénom <span class="red">*</span></label><br>
                    <input type="text" id="prenom" class="prenom" required><br>
                </div>
                <div>
                    <label for="email">Email <span class="red">*</span></label><br>
                    <input type="email" id="email" class="email" required><br>
                </div>

                <button class="validate">Valider</button>


        </form>


        </section>

   <?php require_once('footer.php'); ?>

</body>
</html>


