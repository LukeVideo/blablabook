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
    
    //! AJOUTER FONCTION POUR RECUPERER LES NOTES ET EN FAIRE UNE MOYENNE A AFFICHER SUR LA VUE
    //! BookHasReview.findAll where book_id = bookId et attributes note
    //!const averageNote = Number(somme des notes / notes.length)

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
      const bookId = sanitize(req.params.id);
      const note = sanitize(req.body.note);
      const review = sanitize(req.body.review);
      // const { note, review } = sanitize(req.body);
      console.log('req.body.note :', req.body.note);
      console.log('req.body.review :', req.body.review);
      console.log('Note & review', note, review);
      console.log('bookId via params', bookId);

      // Vérifier si l'utilisateur a déjà donné  un avis sur ce livre

      // Récupérer l'id du reader connecté
      const readerId = req.session.reader.id;

      if(!readerId) {
        return res.status(401).send('Unauthorized');
      }

      // Récupérer le livre sur lequel il faut ajouter un avis
      const book = await Book.findByPk(bookId);

      // Vérifier si le livre existe
      if (!book) {
        return res.status(404).send('Book not found');
      }

      // Vérifier le format de note
      console.log('note avant parseInt', note);
      const parsedNote = Number.parseInt(note, 10);
      console.log("note apres parseInt", parsedNote);
      if(parsedNote < 0 || parsedNote > 5) {
      throw new Error('Invalid note format');
      }
      
      // Ajouter la note et l'avis
      await BookHasReview.create({
        book_id: bookId,
        reader_id: readerId,
        note: parsedNote,
        review: review
      });
      res.render('bookCard', {book});

    }catch(error){
      return next(error);

    }
    
  },

}


export default bookController