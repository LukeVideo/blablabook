import {Role} from '../models/associations.js';

const isAdmin = async (req, res, next) => {
    try {
        const reader = req.session.reader;

        // Vérification que l'utilisateur est bien authentifié
        if (!reader) {
            console.log('NO Reader !');
            return res.status(404).send('User not found');
        }

        // Récupérer le rôle de l'utilisateur
        const readerRole = await Role.findOne({ where: { id: reader.reader_role_id } });

        if (!readerRole) {
            console.log('Rôle non trouvé');
            return res.status(404).send('Role not found');
        }

        console.log(`readerRole.role_name : ${readerRole.role_name}`);

        // On marque l'utilisateur comme admin ou non, mais sans redirection
        if (readerRole.role_name === 'admin') {
            console.log("go admin go !")
            req.isAdmin = true;
        } else {
            req.isAdmin = false;
        }

        // Passe au middleware suivant
        return next();
    } catch (error) {
        error.status = 500;
        return next(error);
    }
};

export default isAdmin;
