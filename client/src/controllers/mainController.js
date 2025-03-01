import sanitize from 'sanitize-html';
import {Op} from 'sequelize';
import {Author, Book} from '../models/associations.js';

const mainController = {
  async redirectHomePage(req, res) {
    
    try {
      res.redirect('/index');

    } catch (error) {
      console.error(error);
      error.status =500
      next(error)
    }
  },
  
  async renderHomePage(req, res, next) {
    try {
      
      const Allbooks = await Book.findAll();

      // Afficher les 5 derniers livres ajoutés :
      const latestBooks = await Book.findAll({
        order : [['createdAt', 'DESC']],
        limit: 5
      })
      
      // Afficher 3 auteurs aléatoires :
      const randomAuthors = await Author.findAll({
        order: Sequelize.literal('random()'), 
        limit: 3
    });

      res.render('index', {Allbooks, latestBooks, randomAuthors});
      
    } catch (error) {
      console.error(error);
      error.status =404
      error.message="Problème avec index"
      next(error)
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

  async test(req, res) {
    console.log("test_page_mainController");
  },

};

export default mainController;

