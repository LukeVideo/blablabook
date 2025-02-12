import { send } from "process";
import sanitize from 'sanitize-html';

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
  async renderCGU(req, res) {
    try {
      res.render('CGU');

    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },

  async renderContactPage(req, res) {
    try {
      res.render('contact');
    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },

  async renderMentionsPage(req, res) {
    try {
      res.render('mentions');
    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },

  async sendMailToAdmin(req, res) {
    const email = sanitize(req.body.email);
    const message = sanitize(req.body.message);
    const adminMail = 'blablabook.ratatosk@gmail.com';
    
    try {
      
      res.render('sendMailToAdmin');
    } catch (error) {
      console.error(error);
      res.status(500).render("error");
    }
  },


};

export default mainController;

