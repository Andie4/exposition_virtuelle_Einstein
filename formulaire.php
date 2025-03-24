<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/style.css">
    <link rel="stylesheet" href="styles/formulaire.css">
    <script src="scripts/formulaire.js" defer></script>
    <script src="scripts/envoiResa.js" defer></script>
    <title>Réservation - Albert, ayez sa vision</title>
</head>

<body>
    <?php include 'nav.php'; ?>


    <main>
        <div>
            <h1 id="content">Acheter un billet</h1>
            <!-- <div class="filAriane">
                <button>Dates & horaires ></button>
                <button>Nombre de billets ></button>
                <button>Coordonnées</button>
            </div> -->
        </div>


        <!-- Dates & horaires  -->

        <div class="column">
            <form action="">
                <div class="slider">
                    <div class="slider-content">
                        <fieldset class="container">


                            <div class="bigMarginBottom">
                                <h2 class="tinyMarginBottom">Dates & horaires</h2>
                                <p class="minuscule tinyMarginTop">Les champs suivis d'un <span class="red">*</span>
                                    sont
                                    obligatoires.</p>
                            </div>

                            <div class="bigMarginBottom">
                                <label for="date">Choisissez une date <span class="red">*</span></label><br>
                                <input type="date" id="date" class="date" min="<?= date('Y-m-d') ?>" name="date_resa"
                                    required><br>
                            </div>

                            <div class="bigMarginBottom">
                                <label>Choisissez un horaire <span class="red">*</span></label>
                                <div class="buttons">
                                    <button type="button" data-time="10:00">10:00</button>
                                    <button type="button" data-time="11:00">11:00</button>
                                    <button type="button" data-time="12:00">12:00</button>
                                    <button type="button" data-time="14:00">14:00</button>
                                    <button type="button" data-time="15:00">15:00</button>
                                    <button type="button" data-time="16:00">16:00</button>
                                    <button type="button" data-time="17:00">17:00</button>
                                    <button type="button" data-time="18:00">18:00</button>
                                </div>
                                <input type="hidden" id="selectedTime" name="horaire_resa">
                            </div>

                            <input type="button" class="validate button-next resaButton" value="Suivant">
                        </fieldset>


                        <fieldset class="container">
                            <div class="bigMarginBottom">
                                <h2 class="tinyMarginBottom">Nombre de billets</h2>
                                <p class="minuscule tinyMarginTop">Les champs suivis d'un <span class="red">*</span>
                                    sont obligatoires.</p>
                            </div>

                            <div class="tarif-container">
                                
                            </div>

                            <input type="button" class="button-before" value="Précédent">
                            <input type="button" class="validate button-next billetsButton" value="Suivant">
                        </fieldset>




                        <!-- Coordonnées -->
                        <fieldset class="container">
                            <div class="bigMarginBottom">
                                <h2 class="tinyMarginBottom">Coordonnées</h2>
                                <p class="minuscule tinyMarginTop borderResa">En procédant à la confirmation de
                                    commande,
                                    vous
                                    acceptez les conditions générales de vente et le traitement des données ci-dessous
                                    renseignées par l'agence Xploria.</p>
                            </div>
                            <div class="flex">
                                <div>
                                    <label for="nom">Nom <span class="red">*</span></label><br>
                                    <input type="text" id="nom" class="nom" name="nom_resa" required><br>
                                </div>
                                <div>
                                    <label for="prenom">Prénom <span class="red">*</span></label><br>
                                    <input type="text" id="prenom" class="prenom" name="prenom_resa" required><br>
                                </div>
                                <div>
                                    <label for="email">Email <span class="red">*</span></label><br>
                                    <input type="email" id="email" class="email" name="mail_resa" required><br>
                                </div>
                            </div>



                            <input type="button" class="button-before" value="Précédent">
                            <input type="submit" class="validate userButton" value="Réserver">
                        </fieldset>
                    </div>
                </div>


            </form>


            <div class="ticket">
                <div class="pointilles">
                    <img src="images/img_ticket.png" alt="" class="ticketImg">
                    <div class="ticketInfos">
                    </div>
                </div>
            </div>
        </div>



    </main>

    <?php require_once('footer.php'); ?>

</body>

</html>