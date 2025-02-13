import Author from './Author.js';
import Book from './Book.js';
import BookHasReview from './BookHasReview.js';
import BookInBookshelf from './BookInBookshelf.js';
import Bookshelf from './Bookshelf.js';
import Reader from './Reader.js';
import Role from './Role.js';
import BookStatus from './bookStatus.js';


Reader.hasOne(Bookshelf, { foreignKey: 'reader_id' });
Bookshelf.belongsTo(Reader, { foreignKey: 'reader_id' });

Book.hasMany(BookHasReview, { foreignKey: 'book_id' });
BookHasReview.belongsTo(Book, { foreignKey: 'book_id' });

Role.hasMany(Reader, { foreignKey: 'reader_role_id' });
Reader.belongsTo(Role, { foreignKey: 'reader_role_id' });

BookStatus.hasMany(BookInBookshelf, {foreignKey : 'book_status_id'});
BookInBookshelf.belongsTo(BookStatus, {foreignKey : 'book_status_id'});


BookInBookshelf.belongsTo(Bookshelf, {foreignKey : 'bookshelf_id'});
Bookshelf.hasMany(BookInBookshelf, {foreignKey : 'bookshelf_id'});

Bookshelf.belongsToMany(Book, {through: BookInBookshelf, foreignKey: 'bookshelf_id', other_key: 'book_id', as: 'books'});
Book.belongsToMany(Bookshelf, {through: BookInBookshelf, foreignKey: 'book_id', other_key: 'bookshelf_id', as: 'bookshelves'})


export {Reader, Bookshelf, Book, Role, BookHasReview, BookInBookshelf, Author, BookStatus};