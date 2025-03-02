import {Op} from 'sequelize';
import {Author, Book} from '../models/associations.js';

const authorController = {
  

async renderAuthorPage (req, res){
  try {
    const author = await Author.findOne({
      where: {
        id: req.params.id
      }
    });
    const books = await Book.findAll({
      where: {
        author_id: req.params.id
      }
    });
    res.render('author', {author, books});
  } catch (error) {
  }
}
}


export default authorController;
