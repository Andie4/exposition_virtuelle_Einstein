import PropTypes from 'prop-types';
import { ButtonDelete } from '../buttonDelete';
import { Link } from 'react-router-dom';

export function CardResa({resa, onDelete }){

    return(
        <>
        <div>
            <p>ID n°{resa.id_resa}</p>
            <p>{resa.nom_resa}</p>
            <p>{resa.prenom_resa}</p>
            <p>{resa.mail_resa}</p>
            <p>{resa.date_resa}</p>
            <p>{resa.heure_resa}</p>
            <Link to={`/formResa/${resa.id_resa}`}>Modifier</Link>
            <ButtonDelete id={resa.id_resa} type="resa" token={localStorage.getItem("token")} onSuccess={onDelete}  />
            <Link to={`/gest_billet/${resa.id_resa}`}>Billets</Link>
        </div>
        </>
    )
}

CardResa.propTypes = {
    resa: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
}