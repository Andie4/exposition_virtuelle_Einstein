document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        // Récupération des données du formulaire
        const formData = new URLSearchParams();
        formData.append("nom_resa", document.querySelector("#nom").value);
        formData.append("prenom_resa", document.querySelector("#prenom").value);
        formData.append("mail_resa", document.querySelector("#email").value);
        formData.append("date_resa", document.querySelector("#date").value);
        formData.append("heure_resa", document.querySelector("#selectedTime").value);

        // Récupération des billets
        document.querySelectorAll(".ticket-category").forEach((ticket) => {
            const tarifBillet = ticket.getAttribute("data-id");
            const billets = ticket.querySelectorAll(".details .person"); // Récupère uniquement les billets créés
        
            billets.forEach((billet, index) => {
                const nomBillet = billet.querySelector(".groupeInfosBillet:nth-of-type(1) .infosBillet")?.value.trim() || "";
                const prenomBillet = billet.querySelector(".groupeInfosBillet:nth-of-type(2) .infosBillet")?.value.trim() || "";
        
                if (nomBillet && prenomBillet) { // Vérifie que les champs ne sont pas vides
                    formData.append(`billets[${index}][nom_billet]`, nomBillet);
                    formData.append(`billets[${index}][prenom_billet]`, prenomBillet);
                    formData.append(`billets[${index}][tarif_billet]`, tarifBillet);
                }
            });
        });
        
        try {
            const response = await fetch("https://albert.xploria.fr/api/resa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            });

            alert("Réservation réussie !");
            window.location.href = "remerciement.php";
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
            alert("Une erreur est survenue lors de l'envoi du formulaire.");
        }
    }
    );
}
);        