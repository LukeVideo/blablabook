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

Reader.hasMany(BookHasReview, { foreignKey: 'reader_id', as: 'reviews' });
BookHasReview.belongsTo(Reader, { foreignKey: 'reader_id', as: 'reader' });

Book.hasMany(BookHasReview, { foreignKey: 'book_id', as: 'book_reviews' });
BookHasReview.belongsTo(Book, { foreignKey: 'book_id', as: 'book_review' });

Role.hasMany(Reader, { foreignKey: 'reader_role_id' });
Reader.belongsTo(Role, { foreignKey: 'reader_role_id' });

BookStatus.hasMany(BookInBookshelf, {foreignKey : 'book_status_id'});
BookInBookshelf.belongsTo(BookStatus, {foreignKey : 'book_status_id'});

BookInBookshelf.belongsTo(Bookshelf, {foreignKey : 'bookshelf_id'});
Bookshelf.hasMany(BookInBookshelf, {foreignKey : 'bookshelf_id'});

Book.belongsToMany(BookStatus, { through: BookInBookshelf, foreignKey: 'book_id', otherKey: 'book_status_id', as: 'status' });
BookStatus.belongsToMany(Book, { through: BookInBookshelf, foreignKey: 'book_status_id', otherKey: 'book_id', as: 'books' });

Bookshelf.belongsToMany(Book, {through: BookInBookshelf, foreignKey: 'bookshelf_id', other_key: 'book_id', as: 'books'});
Book.belongsToMany(Bookshelf, {through: BookInBookshelf, foreignKey: 'book_id', other_key: 'bookshelf_id', as: 'bookshelves'})

BookInBookshelf.belongsTo(Book, { foreignKey: 'book_id' });
Book.hasMany(BookInBookshelf, { foreignKey: 'book_id' });

Book.belongsTo(Author, { foreignKey: 'author_id', as : 'author' });
Author.hasMany(Book, { foreignKey: 'author_id', as : 'books' });



export {Reader, Bookshelf, Book, Role, BookHasReview, BookInBookshelf, Author, BookStatus};