import PropTypes from 'prop-types';
import { ButtonDelete } from '../button/buttonDelete';
import { Link } from 'react-router-dom';

export function CardAdmin({ admin, onDelete }) {
         return (
            <tr>
                <td>{admin.nom_admin}</td>
                <td>{admin.prenom_admin}</td>
                <td>{admin.mail_admin}</td>
                <td>{admin.login_admin}</td>
                <td>
                    <Link to={`/formAdmin/${admin.id_admin}`} className="link-update">
                        Modifier
                    </Link>
                    {admin.id_admin !== Number(localStorage.getItem("id_admin")) && (
                        <ButtonDelete 
                            id={admin.id_admin} 
                            type="admin" 
                            token={localStorage.getItem("token")} 
                            onSuccess={onDelete} 
                        />
                    )}
                </td>
            </tr>
        );
    }
    

CardAdmin.propTypes = {
    admin: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
};
