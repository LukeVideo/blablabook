import sanitize from 'sanitize-html';
import {Op} from 'sequelize';
import { Sequelize } from 'sequelize'; // Pour récupérer l'objet Sequelize
import sequelize from '../../database/connexion_db.js';
import nodemailer from 'nodemailer';
import {Author, Book, BookHasReview, Reader} from '../models/associations.js';

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
      
      //const Allbooks = await Book.findAll();

      // Afficher les 5 derniers livres ajoutés :
      const latestBooks = await Book.findAll({
        include:[
        {model:
          BookHasReview, as: 'book_reviews',
          include:[{model:Reader, as: 'reader'}]
        }],
        order : [['createdAt', 'DESC']],
        limit: 5
      })
      const latestBookWithAvgNote = latestBooks.map(book => {
        if (book.dataValues.book_reviews && book.dataValues.book_reviews.length > 0 ) {
          const notes = book.dataValues.book_reviews

          const bookAvgNote  = notes.length > 0 ? `${Number(notes.reduce((accumulator, note) => accumulator + note, 0))  / notes.length} / 5`: "Aucune note pour ce livre";
        }
        console.log('book review : **************');
        console.log(book.dataValues.book_reviews);
      })
      // Afficher 3 auteurs aléatoires :
      const randomAuthors = await Author.findAll({
        order: sequelize.literal('random()'), 
        limit: 3
    });

    // Récupération de l'ID des auteurs aléatoires pour gérer les liens dans l'EJS
    const authorIds = randomAuthors.map(author => author.id);

      res.render('index', {latestBooks, randomAuthors, authorIds});
      
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

  async contactForm(req, res) {
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

    // Vérifier si les champs sont présents
    if (!userEmail || !userMessage) {
      return res.status(400).json({
        message: 'Email et message sont nécessaires.'
      });
    }

    // Simuler l'envoi de l'email en logguant les informations
    const mailOptions = {
      from: userEmail,  // Utilisation de userEmail du formulaire
      to: 'destinataire@example.com',
      subject: 'Message de Contact',
      text: userMessage,  // Utilisation de userMessage du formulaire
    };

    // Log de la simulation d'envoi d'email
    console.log('Simulation d\'envoi d\'email avec les informations suivantes :');
    console.log('De:', mailOptions.from);
    console.log('À:', mailOptions.to);
    console.log('Sujet:', mailOptions.subject);
    console.log('Message:', mailOptions.text);

    return res.status(200).json({
      message: 'Email simulé envoyé avec succès. Vérifie les logs.',
    });

  } catch (error) {
    console.error('Erreur lors de la simulation de l\'envoi du message:', error);
    return next(error);
  }
},
  
}

export default mainController;

