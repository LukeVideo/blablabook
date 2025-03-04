// IMPORTER ICI
import sanitize from 'sanitize-html';
import {Op} from 'sequelize';
import {Author, Book, Reader, BookHasReview} from '../models/associations.js';
import authValidator from '../utils/authentificator.js';

const bookController = {

  async search (req, res){
    try {


      res.render('search');
      
    } catch (error) {
      return next(error);
    }
  },
  async handleSearch(req, res, next) {
    // console.log("Req body:", req.body);
    const url = req.url;
    // console.log("URL:", url);
  
    try {
      const searchInput = sanitize(req.body.query);
      // console.log("Search input after sanitization:", searchInput);
      if(searchInput.trim() === '') {
        res.render('search', {searchInput, noresult: true});
        return
      }
  
      // Recherche des livres
      const booksToFind = await Book.findAll({
        where: {
          title: {
            [Op.iLike]: `%${searchInput}%`,
          }
        }
      });
  
      // console.log("Books found:", booksToFind.map(book => book.toJSON()));
  
      let authorToFind = [];
      if (booksToFind.length === 0) {
        // console.log(`Pas de titre correspondant... Recherche dans les auteurs avec ${searchInput}`);
  
        // Recherche des auteurs si aucun livre trouvé
        authorToFind = await Author.findAll({
          where: {
            [Op.or]: [
              {
                firstname: {
                  [Op.iLike]: `%${searchInput}%`,
                }
              },
              {
                lastname: {
                  [Op.iLike]: `%${searchInput}%`,
                }
              }
            ]
          }
        });
  
        // console.log("Author(s) found:", authorToFind.map(author => author.toJSON()));
      }
  
      // Ajout d'une variable noresult pour signaler l'absence de résultat
      let noresult;
      if(booksToFind.length === 0 && authorToFind.length === 0){;
      // console.log(`Aucune correspondance avec '${searchInput}'`);
      noresult = true;
    }
      // Rendu de la page, qu'il y ait des livres ou non
      res.render('search', {searchInput, booksToFind, authorToFind, noresult, url });

    } catch (error) {
      return next(error);
    }
  },

  async bookDetails (req, res,  next){
    
    try{
    const bookId = req.params.id;
    const selectedBook = await Book.findByPk(bookId, {
      where: {id: bookId},
      include:[
        {model: 
          Author, as: 'author'
        },
        {model:
          BookHasReview, as: 'BookHasReview',
          include:[{model:Reader, as: 'reader'}]
        }  
      ]
    });

    if (!selectedBook){
      return res.status(404).send('Book not found');
    }
    console.log('Livre sélectionné pour affichage détaillé  :', selectedBook);
    res.render('bookCard', {book: selectedBook});
    }catch(error){
      return next(error);
  }
  
},

  async handleReview(req, res, next) {
    try {
      const bookId = req.params.id;
      const book = await Book.findByPk(bookId);
  }catch(error){
    return next(error);
  }
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.render('addReview', {book});
  },

}


export default bookController