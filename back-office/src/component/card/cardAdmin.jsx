import PropTypes from 'prop-types';
import { ButtonDelete } from '../button/buttonDelete';
import { Link } from 'react-router-dom';

export function CardAdmin({ admin, onDelete }) {
    return (
        <div>
            <p>{admin.nom_admin}</p>
            <p>{admin.prenom_admin}</p>
            <p>{admin.mail_admin}</p>
            <p>{admin.login_admin}</p>
            <Link to={`/formAdmin/${admin.id_admin}`}>Modifier</Link>

            {admin.id_admin !== Number(localStorage.getItem("id_admin")) && (
                <ButtonDelete id={admin.id_admin} type="admin" token={localStorage.getItem("token")} onSuccess={onDelete} />
            )}
        </div>
    );
}

CardAdmin.propTypes = {
    admin: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
};
