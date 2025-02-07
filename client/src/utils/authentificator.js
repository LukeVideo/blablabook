import { notFound } from "./errorsHandler.js";

const authValidator = (req, res, next) => {
  const reader =  req.session.reader
  if (!reader) {
    // Si non, on passe la main au middleware d'erreur (errorHandlers) qui s'occupe d'afficher l'erreur appropriée
    const err = new Error('Not Authenticated');
    err.status = 404;
    return next(err);
  }
  // On passe la main au middleware suivant si le user est bien loggé (ie, dans la session)
  console.log('authValidator ok !');
  return next();
  
};

export default authValidator;