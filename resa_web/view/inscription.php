<main>


<form method="POST">


<div>
    <label for="login">Adresse mail*</label>
    <input type="mail" name="login" id="login" required>
</div>
<?php if (isset($msg) && $msg=="err-login") {
    echo "Le login est déjà pris";
} ?>

<div>
    <label for="prenom">Prenom*</label>
    <input type="text" name="prenom" id="prenom" required>
</div>

<div>
    <label for="nom">Nom*</label>
    <input type="text" name="nom" id="nom" required>
</div>

<div>
    <label for="birth_date">Date de naissance</label>
    <input type="date" name="birth_date" id="birth_date" >
</div>

<div>
    <label for="mdp">Mot de passe*</label>
    <input type="text" name="mdp" id="mdp" required>
</div>


<div>
    <label for="conf">Confirmer le mot de passe*</label>
    <input type="text" name="conf" id="conf" required>
</div>
<?php if (isset($msg) && $msg=="err-mdp") {
    echo "Les mots de passe ne sont pas identiques";
} ?>
<br>
<br>


<input type="submit">




</form>

<a class="txt-center" href="index.php?action=login">Vous avez déjà un compte ? Connectez-vous</a>





</main>