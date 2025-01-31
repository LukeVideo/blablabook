
const mainController = {
  async renderHomePage(req, res) {
    try {
      res.render("index");

    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error");
    }
  },
//   async renderLoginPage(req, res) {
//     try {
//       res.render("index");

//     } catch (error) {
//       console.error(error);
//       res.status(500).render("pages/error");
//     }
//   },
//   async renderRegisterPage(req, res) {
//     try {
//       res.render("index");

//     } catch (error) {
//       console.error(error);
//       res.status(500).render("pages/error");
//     }
//   },
//   async renderAccountPage(req, res) {
//     try {
//       res.render("index");

//     } catch (error) {
//       console.error(error);
//       res.status(500).render("pages/error");
//     }
//   },
//   async renderContactPage(req, res) {
//     try {
//       res.render("index");

//     } catch (error) {
//       console.error(error);
//       res.status(500).render("pages/error");
//     }
//   },
//   async renderHomePage(req, res) {
//     try {
//       res.render("index");

//     } catch (error) {
//       console.error(error);
//       res.status(500).render("pages/error");
//     }
//   },


//   async renderNotFoundPage(_, res) {
//     res.status(404).render("pages/not-found");
//   }
};

export default mainController;