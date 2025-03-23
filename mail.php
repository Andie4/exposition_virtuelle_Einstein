<?php
// sendConfirmationEmail.php

// Vérifier que la requête est bien un POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail_resa = $_POST['mail_resa'];
    $nom_resa = $_POST['nom_resa'];
    $prenom_resa = $_POST['prenom_resa'];
    $date_resa = $_POST['date_resa'];
    $heure_resa = $_POST['heure_resa'];

    // Utiliser la fonction mail de PHP pour envoyer l'email
    $to = $mail_resa;
    $subject = "Confirmation de votre réservation";
    $message = "
    Bonjour $prenom_resa $nom_resa,

    Nous avons bien reçu votre réservation pour le $date_resa à $heure_resa.

    Nous vous remercions pour votre confiance et avons hâte de vous accueillir.

    L'équipe Xploria
    ";
    $headers = "From: xploria.agency@gmail.com";

    // Envoi de l'email
    if (mail($to, $subject, $message, $headers)) {
        // Rediriger vers la page de remerciement
        header("Location: remerciement.php");
        exit;
    } else {
        echo "Une erreur est survenue lors de l'envoi de l'email.";
    }
} else {
    echo "Erreur : Requête invalide.";
}
?>
