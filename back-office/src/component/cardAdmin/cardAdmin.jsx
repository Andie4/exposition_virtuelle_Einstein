import PropTypes from 'prop-types';

export function CardAdmin({admin}){

    return(
        <>
        <div>
            <p>{admin.nom_admin}</p>
            <p>{admin.prenom_admin}</p>
            <p>{admin.mail_admin}</p>
            <p>{admin.login_admin}</p>
            <button>Modifier</button>
            <button>Supprimer</button>
        </div>
        </>
    )
}

CardAdmin.propTypes = {
    admin: PropTypes.object.isRequired
}