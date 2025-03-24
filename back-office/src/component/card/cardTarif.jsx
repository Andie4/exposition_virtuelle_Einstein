import PropTypes from 'prop-types';
import { ButtonDelete } from '../button/buttonDelete';
import { Link } from 'react-router-dom';

export function CardTarif({ tarif, onDelete }) {
    return (
        <tr>
            <td>{tarif.nom_tarif}</td>
            <td>{tarif.name_tarif}</td>
            <td>
                <Link to={`/formTarif/${tarif.id_tarif}`} className="link-update">Modifier</Link>
                <ButtonDelete
                    id={tarif.id_tarif}
                    type="tarif"
                    token={localStorage.getItem("token")}
                    onSuccess={onDelete}
                />
            </td>
        </tr>
    );
}

CardTarif.propTypes = {
    tarif: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
};
