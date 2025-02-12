// IMPORTER ICI
import sanitize from 'sanitize-html';
import {Op} from 'sequelize';
import Book from '../models/Book.js';
import Author from '../models/Author.js';

const bookController = {

  async search (req, res){
    try {


      res.render('search');
      
    } catch (error) {
      return next(error);
    }
  },
  async handleSearch(req, res, next) {
    console.log("Req body:", req.body);
  
    try {
      const searchInput = sanitize(req.body.query);
      console.log("Search input after sanitization:", searchInput);
  
      // Recherche des livres
      const booksToFind = await Book.findAll({
        where: {
          title: {
            [Op.iLike]: `%${searchInput}%`,
          }
        }
      });
  
      console.log("Books found:", booksToFind.map(book => book.toJSON()));
  
      let authorToFind = [];
      if (booksToFind.length === 0) {
        console.log(`Pas de titre correspondant... Recherche dans les auteurs avec ${searchInput}`);
  
        // Recherche des auteurs si aucun livre trouvé
        authorToFind = await Author.findAll({
          where: {
            lastname: {
              [Op.iLike]: `%${searchInput}%`, // Recherche insensible à la casse
            }
          }
        });
  
        console.log("Author(s) found:", authorToFind.map(author => author.toJSON()));
      }
  
      // Ajout d'une variable noresult pour signaler l'absence de résultat
      const noresult = booksToFind.length === 0 && authorToFind.length === 0;
  
      // Rendu de la page, qu'il y ait des livres ou non
      res.render('search', { searchInput, booksToFind, authorToFind, noresult });
  
    } catch (error) {
      return next(error);
    }
  }
  
}


export default bookController


