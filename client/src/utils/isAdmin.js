import Role from '../models/Role.js';

const isAdmin = async (req, res, next) => {
    // On a enchainé les middlewares, si on est la on a un user
    // On va recupérer son rôle
    const reader = req.session.reader
    if (!reader){
        console.log('NO Reader !')
        req.status = 404;
        return next();
    }
    
    const readerRole =  await Role.findOne({ where: { id: reader.reader_role_id } })
    
    
    console.log(`readerRole.role_name : ${readerRole}`)

    if (readerRole.role_name !== 'admin') {
        console.log('NOT ADMIN Reader !')

        req.status = 404;
        return next(new Error('la page n\'existe pas'));
        
    }
    
    return next();
    
};

export default isAdmin;
