<main>
    <h1>Page d'accueil</h1>
    <p>Bonjour <?php if(isset($_SESSION["nom"])){ echo $_SESSION["nom"];}  ?></p>
</main>