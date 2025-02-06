// On se sert des locals pour pouvoir utiliser la variable user dans les views.
const loadReaderToLocals = (req, res, next) => {
  if (req.session.reader) {
    res.locals.reader = req.session.reader;
  } else {
    res.locals.reader = null;
  }

  next();
};

export default loadReaderToLocals;
