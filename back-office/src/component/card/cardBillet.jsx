import PropTypes from 'prop-types';
import { ButtonDelete } from '../button/buttonDelete';
import { Link } from 'react-router-dom';

export function CardBillet({resa, billet, onDelete }){

    return(
        <>
        <div>
            <p>ID n°{billet.id_billet}</p>
            <p>{billet.nom_billet}</p>
            <p>{billet.prenom_billet}</p>
            <p>{billet.reda_billet}</p>
            <p>{billet.tarif_billet}</p>
            <Link to={`/formBillet/${resa}/${billet.id_billet}`}>Modifier</Link>
            <ButtonDelete id={billet.id_billet} type="billet" token={localStorage.getItem("token")} onSuccess={onDelete}  />
        </div>
        </>
    )
}

CardBillet.propTypes = {
    billet: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
}