
const mainController = {
  async redirectHomePage(req, res) {
    
    try {
      res.redirect('/index');

    } catch (error) {
      console.error(error);
      // res.status(500).render("error");
      res.status(500)
      next(error)
    }
  },
  async renderHomePage(req, res) {
    console.log("coucou index")
    try {
      res.render('index');

    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },

};

export default mainController;

