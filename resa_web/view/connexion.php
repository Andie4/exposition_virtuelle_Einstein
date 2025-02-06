<main>
<form method="POST">
    <!-- action="view/traite_login.php" -->
    <?php if (isset($msg) && $msg == "inscription") {
        echo "Votre compte à bien été créé <br>";
    } ?>
    <label for="login">Login</label>
    <input type="text" name="login" id="login" required>
    <?php if (isset($msg) && $msg == "err-login") {
        echo "Mauvais login";
    } ?>

    <label for="mdp">Mot de passe</label>
    <input type="text" name="mdp" id="mdp" required>
    <?php if (isset($msg) && $msg == "err-mdp") {
        echo "Mauvais mot de passe";
    } ?>

    <input type="submit">

</form>

<a class="txt-center" href="index.php?action=inscription">Vous n'avez pas de compte ? Inscrivez-vous</a>





</main>