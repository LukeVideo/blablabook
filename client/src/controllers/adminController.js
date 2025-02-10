// IMPORTER ICI
import axios from 'axios';
import sanitize from 'sanitize-html';
import dotenv from 'dotenv';


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
      // récupérer les mots rentrés par l'utilisateur (req.body) //! sanitize
      
      const apiQueryString = sanitize(req.body.searchFromAPI);
      const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
  
      // Envoyer ces informations avec la clef API au modèle sur la route
     
      const response = await axios.get(`${BASE_URL}?q=${apiQueryString}&key=${process.env.API_KEY}`);
      console.log(response.data);
      // Renvoie les infos en JSON pour les utiliser
  
      } catch (error) {
        console.error(error);
        res.status(500).render("error");

    }

  },


  async addBookForm (req, res){
    try {
      res.render("addBookToDB");

     
    
      } catch (error) {
        console.error(error);
        res.status(500).render("error");

    }
  }
}

export default adminController;

