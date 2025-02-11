// IMPORTER ICI
import sanitize from 'sanitize-html';
import {Op} from 'sequelize';
import Book from '../models/Book.js';

const bookController = {

  async search (req, res){
    try {


      res.render('search');
      
    } catch (error) {
      return next(error);
    }
  },
  async handleSearch(req, res, next){
    try {
      const searchInput = sanitize(req.body.query);
      // console.log(req.body.query)
      // console.log(searchInput)

      const booksToFind = await Book.findAll({
        where: {
          title: {
            [Op.iLike]: `%${searchInput}%`, 

              }
            }
          })
    console.log(`books to find and display : ${booksToFind}`)
    const noresult = !booksToFind.length;
    console.log(noresult);
      
      res.render('search', {searchInput, booksToFind, noresult});
    } catch (error) {
      return next(error);
    }
  }

  }

  export default bookController