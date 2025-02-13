import Author from './Author.js';
import Book from './Book.js';
import BookHasReview from './BookHasReview.js';
import Bookshelf from './Bookshelf.js';
import Reader from './Reader.js';
import Role from './Role.js';

Reader.hasOne(Bookshelf, { foreignKey: 'reader_id' });
Bookshelf.belongsTo(Reader, { foreignKey: 'reader_id' });

Book.hasMany(BookHasReview, { foreignKey: 'book_id' });
BookHasReview.belongsTo(Book, { foreignKey: 'book_id' });

Role.hasMany(Reader, { foreignKey: 'reader_role_id' });
Reader.belongsTo(Role, { foreignKey: 'reader_role_id' });


export {Reader, Bookshelf, Book, Role, BookHasReview, Author};