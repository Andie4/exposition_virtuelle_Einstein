import PropTypes from 'prop-types';
import { ButtonDelete } from '../button/buttonDelete';
import { Link } from 'react-router-dom';

export function CardBillet({ resa, billet, tarif, onDelete }) {
    return (
        <tr>
            <td>{billet.id_billet}</td>
            <td>{billet.nom_billet} {billet.prenom_billet}</td>
            <td>{tarif.nom_tarif}</td>
            <td>
                <Link to={`/formBillet/${resa}/${billet.id_billet}`} className="link-update">Modifier</Link>
                <ButtonDelete
                    id={billet.id_billet}
                    type="billet"
                    token={localStorage.getItem("token")}
                    onSuccess={onDelete}
                />
            </td>
        </tr>
    );
}

CardBillet.propTypes = {
    billet: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
};
