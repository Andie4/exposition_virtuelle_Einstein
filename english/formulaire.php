<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles/style.css">
    <link rel="stylesheet" href="../styles/formulaire.css">
    <script src="scripts/formulaire.js" defer></script>
    <script src="../scripts/envoiResa.js" defer></script>
    <link rel="icon" href="../media/favicon.svg" />
    <title>Booking - Albert, See Through His Eyes</title>
</head>

<body>
    <?php include 'nav.php'; ?>


    <main>
        <div>
            <h1 id="content">Book a Ticket</h1>
        </div>

        <!-- Dates & Times -->

        <div class="column">
            <form action="">
                <div class="slider">
                    <div class="slider-content">
                        <fieldset class="container">

                            <div class="bigMarginBottom">
                                <h2 class="tinyMarginBottom">Dates & Times</h2>
                                <p class="minuscule tinyMarginTop">Fields marked with <span class="red">*</span> are
                                    required.</p>
                            </div>

                            <div class="bigMarginBottom">
                                <label for="date">Select a date <span class="red">*</span></label><br>
                                <input type="date" id="date" class="date" min="<?= date('Y-m-d') ?>" name="date_resa"
                                    required><br>
                            </div>

                            <div class="bigMarginBottom">
                                <label>Select a time <span class="red">*</span></label>
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

                            <input type="button" class="validate button-next resaButton" value="Next">
                        </fieldset>

                        <fieldset class="container">
                            <div class="bigMarginBottom">
                                <h2 class="tinyMarginBottom">Number of Tickets</h2>
                                <p class="minuscule tinyMarginTop">Fields marked with <span class="red">*</span> are required.</p>
                            </div>

                            <div class="tarif-container">
                                
                            </div>

                            <input type="button" class="button-before" value="Previous">
                            <input type="button" class="validate button-next billetsButton" value="Next">
                        </fieldset>

                        <!-- Contact Information -->
                        <fieldset class="container">
                            <div class="bigMarginBottom">
                                <h2 class="tinyMarginBottom">Contact Information</h2>
                                <p class="minuscule tinyMarginTop borderResa">By confirming your booking, you accept the terms and conditions of sale and the processing of the data provided below by Xploria Agency.</p>
                            </div>
                            <div class="flex">
                                <div>
                                    <label for="nom">Last Name <span class="red">*</span></label><br>
                                    <input type="text" id="nom" class="nom" name="nom_resa" required><br>
                                </div>
                                <div>
                                    <label for="prenom">First Name <span class="red">*</span></label><br>
                                    <input type="text" id="prenom" class="prenom" name="prenom_resa" required><br>
                                </div>
                                <div>
                                    <label for="email">Email <span class="red">*</span></label><br>
                                    <input type="email" id="email" class="email" name="mail_resa" required><br>
                                </div>
                            </div>

                            <input type="button" class="button-before" value="Previous">
                            <input type="submit" class="validate userButton" value="Book">
                        </fieldset>
                    </div>
                </div>

            </form>

            <div class="ticket">
                <div class="pointilles">
                    <img src="../images/img_ticket.png" alt="" class="ticketImg">
                    <div class="ticketInfos">
                    </div>
                </div>
            </div>
        </div>

    </main>

    <?php require_once('footer.php'); ?>

</body>

</html>
