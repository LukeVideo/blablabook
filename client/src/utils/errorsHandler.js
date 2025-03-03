export function notFound (req, res, next) {
    // Erreur 404
    console.log(`Route not found: ${req.originalUrl}`)
    const err = new Error('Not Found error handler');
    err.status = 404;
    return next(err);
};


export function unAuthorized (req, res, next) {
    // Erreur 403
    console.log("notAuthorized")
    const err = new Error('NotAuthorized error handler');
    err.status = 403;
    return next(err);
};


// exports function internalError (req, res, next) {
//  }

// Un middleware d'erreur attend 4 arguments (au lieu de 3), le premier étant l'erreur.
// Lors d'un appel à `next()`, si on passe une Erreur en argument (`next(error)`), alors le prochain middleware qui sera traversé sera le middleware d'erreur.
export function developmentErrors (err, req, res, next) {
    const devEnvironment= process.env.DEV_ENV === 'true';
    if(!devEnvironment){
        next(err);
    }
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        status: err.status || 500,
        stack: err.stack,
        stackHighlighted: err.stack.replace(
            /[a-z_-\d]+.js:\d+:\d+/gi,
            '<mark>$&</mark>'
        ),
    };
    console.log(errorDetails)
    res.status(errorDetails.status );
    res.format({ // Send a different response format based on the `Accept` http header
        'text/html': () => { res.render('error', errorDetails); }, // Web client call
        'application/json': () => { res.json(errorDetails); }, // Ajax call, send JSON back
    });
    // res.render('error', errorDetails)
};
