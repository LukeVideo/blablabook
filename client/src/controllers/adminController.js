// IMPORTER ICI
import axios from 'axios';
import sanitize from 'sanitize-html';
import {Book, Role, Author} from '../models/associations.js';
import isAdmin from '../utils/isAdmin.js';
import dotenv from 'dotenv';
import { error } from 'console';


const adminController = {

  async dashboard(req, res, next) {
    // console.log('dashboard called');
    try {
        const reader = req.session.reader;
        console.log("reader:", reader);

        if (!reader || !reader.reader_role_id) {
            console.error("Le reader ou son reader_role_id est invalide");
            return res.status(400).send("Role invalide");
        }

        // Vérification si l'utilisateur est admin
        const isUserAdmin = req.isAdmin;  // On récupère la valeur déjà définie par isAdmin middleware

        // Envoie des données à la vue, y compris le statut admin
        res.render('dashboard', { isAdmin: isUserAdmin, reader });
  
    } catch (error) {
        console.error(error);
        error.status = error.status || 500;
        next(error);
    }
},
  
  
searchBookFromAPI: async (req, res, next) => {
  try {
    // Vérification que l'utilisateur est un admin
    if (!req.isAdmin) {
      throw new Error("message", 404)
    }

    // Logique pour récupérer les livres ou tout ce que tu veux afficher
   //  const books = await Book.findAll();  // Exemples de récupération de livres depuis la base de données

    res.render('addBookToDB');  // Retourner les livres en réponse au client

  } catch (error) {
    console.error(error);
    error.status = error.status || 404;
    next(error);
}
},

async  getBookList(req, res) {
  try {
      // Nettoyage des entrées utilisateur avec sanitize-html
      const apiTitleString = sanitize(req.body.titleFromAPI);
      const apiAuthorString = sanitize(req.body.authorFromAPI);
      const apiIsbnString = sanitize(req.body.isbnFromAPI).replace(/-/g, '');
      const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

      // Fonction pour vérifier la validité de l'ISBN
      function isValidIsbn(isbn) {
          return /^\d{10}(\d{3})?$/.test(isbn);
      }

      // Construction de l'URL de recherche
      function getApiUrl() {
          if (apiIsbnString) {
              if (isValidIsbn(apiIsbnString)) {
                  return `${BASE_URL}?q=isbn:${apiIsbnString}&key=${process.env.API_KEY}`;
              }
              return null; // Retourne null si l'ISBN est invalide
          }
          return `${BASE_URL}?q=intitle:${apiTitleString}+inauthor:${apiAuthorString}&orderBy=relevance&maxResults=20&key=${process.env.API_KEY}`;
      }

      const apiUrl = getApiUrl();
      if (!apiUrl) {
          return res.render('addBookToDB', { message: "ISBN non valide ou inconnu" });
      }

      // Requête API Google Books
      const response = await axios.get(apiUrl);
      const books = await response.data.items || [];

      if (books.length === 0) {
          return res.render("addBookToDB", { message: "Aucun résultat trouvé !" });
      }
      

      // Extraction des informations essentielles des livres
      const bookList = books.map(item => ({
          selfLink: item.selfLink || "Non disponible",
          title: item.volumeInfo?.title || "Titre inconnu",
          authors: item.volumeInfo?.authors || ["Auteur inconnu"],
          releaseDate: item.volumeInfo?.publishedDate || "Date inconnue",
          description: item.volumeInfo?.description || "Pas de description",
          isbn10: item.volumeInfo?.industryIdentifiers?.[0]?.identifier || "Non disponible",
          isbn13: item.volumeInfo?.industryIdentifiers?.[1]?.identifier || "Non disponible",
          imageLink: item.volumeInfo?.imageLinks?.thumbnail || "/images/DefaultBookCoverImg.png"
      }));

      return res.render("addBookToDB", { bookList });

  } catch (error) {
      console.error("Erreur API Google Books :", error);
      return res.render('error', { status: 500, message: "Erreur interne du serveur." });
  }
},


  async addBookToDB(req, res) {
    console.log("addBookToDB called");
    try {
        console.log("Données reçues pour ajouter le livre :", req.body);

        // Vérification des données
        const { title, authors, isbn, releaseDate, description, book_cover } = req.body;

        console.log(`################################${book_cover}`)

        
        if (!title || !authors || !isbn) {
            return res.status(400).render("addBookToDB", { message: "Titre, auteur, ISBN et couverture sont obligatoires." });
        }

        // Supposons que authors contient le nom complet sous forme "Prénom Nom"
        const [firstname, ...lastnameArr] = authors.split(" ");
        const lastname = lastnameArr.join(" ");
        console.log(`author's firstname: ${firstname}, author's lastname: ${lastname}`);

        // Vérifier si l'auteur existe déjà
        let author = await Author.findOne({ where: { firstname, lastname } });
        console.log(`author findOne: ${author}`);
        if (!author) {
            // Si l'auteur n'existe pas, le créer
            author = await Author.create({ 
              firstname,
              lastname,
              biography: "Biographie non renseignée"
            });
            console.log(`created author ${author}`)
        }
        

      
        // Vérifier si le livre existe déjà via l'ISBN
        const existingBook = await Book.findOne({ where: { isbn } });
        console.log(`existingBook: ${existingBook}`);
        if (existingBook) {
            return res.status(400).render("addBookToDB", { message: "Le livre existe déjà dans la base de données." });
        }
        // HANDLE CATEGORY
        // categories: [ 'Young Adult Fiction' ],
        // Faut créé
        // Ajouter le livre à la base de données avec `author_id`
        const newBook = await Book.create({
            title,
            author_id: author.id,
            isbn,
            category_id : 6,
            release_date: releaseDate || new Date(),
            book_description: description || null,
            book_cover: book_cover,
            created_at: new Date(),
            updated_at: new Date(),
        });

        console.log("Nouveau livre ajouté :", newBook);
        res.render("addBookToDB", { message: "Livre ajouté avec succès !" });

    } catch (error) {
        console.error("Erreur lors de l'ajout du livre :", error);
        res.status(500).render("addBookToDB", { message: "Une erreur s'est produite lors de l'ajout du livre." });
    }
}

    // try {
    //   //* Contexte : l'API google a déjà été appelé pour afficher des livres au client
    //   //* Contexte : Chaque livre a un bouton d'ajout qui appelle addBookToDB
    //   //* le bouton de submit du form d'ajout envoit les infos dans le body
    //   const {title, authors, isbn, releaseDate, description, image} = req.body
    //   console.log("Données reçues pour ajouter le livre :", bookToAdd);

    //   // Vérifier que les données principales soit disponibles pour ajouter le livre
    //   if (!bookToAdd.title || !bookToAdd.authors || !bookToAdd.isbn) {
    //     return res.status(400).render("addBookToDB", { message: "Des informations sont manquantes." });
    //   }
    //   console.log('Informations suffisantes pour ajouter le livre')
      
    //   // Vérifier si le livre existe déjà dans la DB via son ISBN
    //   const existingBook = await Book.findOne({ where: { isbn: bookToAdd.isbn } });
      
    //   if (existingBook) {
    //     return res.status(400).render("addBookToDB", { message: "Le livre existe déjà dans la base de données." });
    //   }



    //   // Quand on a le livre, on crée un nouveau livre dans la DB sous le format défini dans le modèle Book.js
    //   const newBook = await Book.create({
    //     title: bookToAdd.title,
    //     authors: bookToAdd.authors,
    //     isbn: bookToAdd.isbn,
    //     releaseDate: bookToAdd.releaseDate,
    //     description: bookToAdd.description,
    //     image: bookToAdd.image,
    //     link: bookToAdd.link,
    //     created_at: new Date(),
    //     updated_at: new Date()
    //   });
    //   console.log('Nouveau livre ajouté', newBook);
    //   // si le livre est correctement ajoutée, message de réussite, sinon erreur renvoyée
    //   res.render("addBookToDB", { message: "Livre ajouté avec succès !" });

    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).render("addBookToDB",{ message: "Une erreur s'est produite lors de l'ajout du livre." });

    // }
  }


export default adminController;

