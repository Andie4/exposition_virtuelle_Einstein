import PropTypes from 'prop-types';
import { ButtonDelete } from '../button/buttonDelete';
import { Link } from 'react-router-dom';

export function CardBillet({resa, billet, tarif, onDelete }){

    return(
        <>
        <div className="card">
            <p>Billet ID{billet.id_billet}</p>
            <p>{billet.nom_billet} {billet.prenom_billet}</p>
            <p>Tarif : {tarif.nom_tarif}</p>
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