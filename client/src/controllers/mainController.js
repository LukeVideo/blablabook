import sanitize from 'sanitize-html';
import {Op} from 'sequelize';
import nodemailer from 'nodemailer';
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

  async renderMentionsPage(req, res) {
    try {
      res.render('mentions');
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


  async sendContactMail(req, res, next) {
    // Utilisation de nodemailer (librairie) pour simuler l'envoi d'un email
    // https://nodemailer.com/about/
    try {
      // Récupérer les données du formulaire de contact
      const { userEmail, userMessage } = req.body;
  
      // On crée un transporteur Nodemailer
      const transporter = nodemailer.createTransport({
        // Il faut préciser le service utilisé : ici Gmail
        service: 'gmail', 
        auth: {
          // il faut noter les variables d'environnement pour permettre la connexion à la boite mail reliéee au serveur
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
  
      // Définir les options de l'email
      const mailOptions = {
        from: userEmail,
        to: 'admin@example.com',
        subject: 'Message de contact',  
        text: userMessage, 
      };
  
      // Simulation de l'envoi de l'email
      const info = await transporter.sendMail(mailOptions);
  
      // Log de l'email envoyé
      console.log('Email envoyé:', info.response);
  
      // Répondre à l'utilisateur après l'envoi du message
      const message = 'Message envoyé ! Nous vous répondrons au plus vite !';
      res.render('contact', { message });
  
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      return next(error);  // Propager l'erreur à l'intercepteur d'erreurs (middleware)
    }
},
}

export default mainController;

