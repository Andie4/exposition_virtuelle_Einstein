import PropTypes from 'prop-types';

export function CardResa({resa}){

    return(
        <>
        <div>
            <p>{resa.nom_resa}</p>
            <p>{resa.prenom_resa}</p>
            <p>{resa.mail_resa}</p>
            <p>{resa.date}</p>
            <p>{resa.heure}</p>
            <button>Modifier</button>
            <button>Supprimer</button>
        </div>
        </>
    )
}

CardResa.propTypes = {
    resa: PropTypes.object.isRequired
}