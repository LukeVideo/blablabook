
const mainController = {
  async redirectHomePage(req, res) {
    
    try {
      res.redirect('/index');

    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error");
    }
  },
  async renderHomePage(req, res) {
    console.log("coucou index")
    try {
      res.render('index');

    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error");
    }
  },

};

export default mainController;

