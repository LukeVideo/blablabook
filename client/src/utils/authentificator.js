const authValidator = (req, res, next) => {
  const reader =  req.session.reader
  if (!reader) {
    // Sinon, on passe la main au middleware d'erreur (errorHandlers) qui s'occupe d'afficher l'erreur appropriée
    req.status = 404;
    return next(new Error('Page  not found'));
  }
  // On passe la main au middleware suivant si le user est bien loggé (ie, dans la session)
  console.log('authValidator ok !');
  return next();
  
};

export default authValidator;