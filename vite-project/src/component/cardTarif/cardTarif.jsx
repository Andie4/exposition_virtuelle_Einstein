import PropTypes from 'prop-types';

export function CardTarif({tarif}){

    return(
        <>
        <div>
            <p>{tarif.nom_tarif}</p>
            <p>{tarif.prix}€</p>
            <button>Modifier</button>
            <button>Supprimer</button>
        </div>
        </>
    )
}

CardTarif.propTypes = {
    tarif: PropTypes.object.isRequired
}