
export function ButtonAdd({ type, token, data }) {

    
    const handleAdd = (e) => {
        
        e.preventDefault(); // Empêche le rechargement de la page
        console.log("Ajout de :", data);
        
        const formData = new URLSearchParams();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        console.log("formData :", formData);

        fetch(`http://localhost/exposition_virtuelle_Einstein/api/${type}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString(),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Ajout réussi :", result);
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout :", error);
                alert("Une erreur est survenue.");
            });
    }
    return (
        <button onClick={handleAdd} className="btn-update">
            Ajouter
        </button>
    );
};
