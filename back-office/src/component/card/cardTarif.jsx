import PropTypes from 'prop-types';
import { ButtonDelete } from '../button/buttonDelete';
import { Link } from 'react-router-dom';

export function CardTarif({tarif, onDelete}){

    return(
        <>
        <div>
            <p>{tarif.nom_tarif}</p>
            <p>{tarif.prix_tarif}€</p>
            <Link to={`/formTarif/${tarif.id_tarif}`}>Modifier</Link>
            <ButtonDelete id={tarif.id_tarif} type="tarif" token={localStorage.getItem("token")} onSuccess={onDelete} />
        </div>
        </>
    )
}

CardTarif.propTypes = {
    tarif: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
}