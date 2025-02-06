<main>
<form method="POST">
    <!-- action="view/traite_login.php" -->
    <?php if (isset($msg) && $msg == "inscription") {
        echo "Votre compte à bien été créé <br>";
    } ?>
    <div>
        <label for="login">Adresse mail</label>
        <input type="email" name="login" id="login" required>
    </div>
    <?php if (isset($msg) && $msg == "err-login") {
        echo "Mauvais login";
    } ?>

    <div>
        <label for="mdp">Mot de passe</label>
        <input type="text" name="mdp" id="mdp" required>
    </div>
    <?php if (isset($msg) && $msg == "err-mdp") {
        echo "Mauvais mot de passe";
    } ?>

    <input type="submit">

</form>

<a class="txt-center" href="index.php?action=inscription">Vous n'avez pas de compte ? Inscrivez-vous</a>





</main>