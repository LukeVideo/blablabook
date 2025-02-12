import {Op} from 'sequelize';
import Book from '../models/Book.js';
import Author from '../models/Author.js';


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