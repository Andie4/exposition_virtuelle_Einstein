import PropTypes from 'prop-types';
import { ButtonDelete } from '../button/buttonDelete';
import { Link } from 'react-router-dom';

export function CardResa({ resa, onDelete }) {
    // Format de la date
    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options); // Format dd/mm/yyyy
    };

    // Format de l'heure
    const formatTime = (time) => {
        // Extraire les heures et les minutes
        const [hours, minutes] = time.split(':');
        return `${hours}h${minutes}`; // Format 12h00
    };

    return (
        <tr>
            <td>{resa.id_resa}</td>
            <td>{resa.nom_resa} {resa.prenom_resa}</td>
            <td>{resa.mail_resa}</td>
            <td>{formatDate(resa.date_resa)}</td>
            <td>{formatTime(resa.heure_resa)}</td>
            <td>
                <Link to={`/formResa/${resa.id_resa}`} className="link-update">Modifier</Link>
                <ButtonDelete
                    id={resa.id_resa}
                    type="resa"
                    token={localStorage.getItem("token")}
                    onSuccess={onDelete}
                />
                <Link to={`/gest_billet/${resa.id_resa}`} className="link-update">Billets</Link>
            </td>
        </tr>
    );
}

CardResa.propTypes = {
    resa: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
};
