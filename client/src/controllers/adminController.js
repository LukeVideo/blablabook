// IMPORTER ICI
import axios from 'axios';
import sanitize from 'sanitize-html';
import {Book, Role} from '../models/associations.js';
import dotenv from 'dotenv';
import { error } from 'console';


const adminController = {

  async dashboard (req, res){
    try {
    
    // Il faut vérifier que l'utilisateur  (déjà connecté, donc en session), possède le  rôle admin pour accéder à la route
    // Pour ça, on récupère le cookie de session
    // On vérifie le rôle stocké
    // On compare avec le rôle admin dans la BDD
    // si false = redirect vers la page d'accueil
    // out of if pour poursuivre si ===
    // Si === alors ok, admin page

      res.render('dashboard');

    } catch (error) {
  
      return next(error);
    }
  },

  async getBookList (req, res){
    try {
    console.log (req.body.searchFromAPI);
      // récupérer les mots rentrés par l'utilisateur (req.body) en utilisant sanitize-html
      
      const apiTitleString = sanitize(req.body.titleFromAPI);
      const apiAuthorString = sanitize(req.body.authorFromAPI);
      const apiIsbnString = sanitize(req.body.isbnFromAPI).replace(/-/g, '');

      const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
      const apiData = {BASE_URL, apiTitleString, apiAuthorString, apiIsbnString, key:process.env.API_KEY};
      
      //Regex to format ISBN without hyphens --> Return boolean
      function isValidIsbn (isbn){
        const isbnRegex = /^\d{10}(\d{3})?$/;
        return isbnRegex.test(isbn);  
        }
      function apiUrl (data){
        console.log(`ISBN = ${data.apiIsbnString}`);
        if (data.apiIsbnString) {
          try {
            if (isValidIsbn(data.apiIsbnString)){
              // Envoyer ces informations avec la clef API au modèle sur la route
              // Si isbn chercher par isbn
              
              const url = `${BASE_URL}?q=+isbn:${apiIsbnString}&key=${process.env.API_KEY}`;
              return url;
            }
            
            throw new Error("message", 400)
            
          } catch (error) {
            console.error(error);
            res.render('addBookToDB', {message:"ISBN non valide ou inconnu"});
    
          }
        }
              // si pas d'isbn recherche par titre et auteur
        const url = `${BASE_URL}?q=+intitle:${apiTitleString}+inauthor:${apiAuthorString}&orderBy=relevance&maxResults=20&key=${process.env.API_KEY}`;
        return url;
        
      };
      
      // const response = await axios.get(`${BASE_URL}?q=+${filter}:${apiQueryString}&orderBy=relevance&key=${process.env.API_KEY}`);
      const response = await axios.get(apiUrl(apiData));
      
      if (response.data.items !== undefined){
        const bookList = response.data.items.map(item => {
            console.log(item.volumeInfo.title, item.volumeInfo.authors);
            // console.log(item.selfLink, item.volumeInfo, item.searchInfo, item.imageLinks);
            const bookItem =  {
              selfLink : item.selfLink,
              title : item.volumeInfo.title,
              authors : item.volumeInfo.authors,
              releaseDate: item.volumeInfo.publishedDate,
              isbn10: item.volumeInfo.industryIdentifiers[0].identifier,
              isbn13: item.volumeInfo.industryIdentifiers[1].identifier,
              searchInfo : item.searchInfo,
              imageLinks : item.imageLinks
            }
            return bookItem;
          })
        res.render("addBookToDB", {bookList})
      }
      

      res.render("addBookToDB", {message:"Aucun resultat !"})


      // Renvoie les infos en JSON pour les utiliser
  
      } catch (error) {
        console.error(error);
        res.status(500).render("error");

    }

  },


  async addBookToDB (req, res){
    try {
      //* Contexte : l'API google a déjà été appelé pour afficher des livres au client
      //* Contexte : Chaque livre a un bouton d'ajout qui appelle addBookToDB
      //* le bouton de submit du form d'ajout envoit les infos dans le body
      const bookToAdd = req.body
      console.log (bookToAdd);


      // Quand on a le livre, on crée un nouveau livre dans la DB sous le format défini dans le modèle Book.js
      const newBook = await Book.create({
        title: bookToAdd.title,
        authors: bookToAdd.authors,
        isbn: bookToAdd.isbn,
        releaseDate: bookToAdd.releaseDate,
        description: bookToAdd.description,
        image: bookToAdd.image,
        link: bookToAdd.link,
        created_at: new Date(),
        updated_at: new Date()
      });
      
      // si le livre est correctement ajoutée, message de réussite, sinon erreur renvoyée
      res.render("addBookToDB", { message: "Livre ajouté avec succès !" });

      } catch (error) {
        console.error(error);
        res.status(500).render("error");

    }
  }
}

export default adminController;

