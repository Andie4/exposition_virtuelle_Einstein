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
        document.querySelectorAll(".ticket-category").forEach((ticket, index) => {
            const nomBillet = ticket.querySelector(".infosBillet:nth-child(1)")?.value || "";
            const prenomBillet = ticket.querySelector(".infosBillet:nth-child(2)")?.value || "";
            const tarifBillet = ticket.getAttribute("data-id");

            formData.append(`billets[${index}][nom_billet]`, nomBillet);
            formData.append(`billets[${index}][prenom_billet]`, prenomBillet);
            formData.append(`billets[${index}][tarif_billet]`, tarifBillet);
        });

        try {
            const response = await fetch("http://localhost/exposition_virtuelle_Einstein/api/resa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            });

            alert("Réservation réussie !");
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
            alert("Une erreur est survenue lors de l'envoi du formulaire.");
        }
    }
    );
}
);        