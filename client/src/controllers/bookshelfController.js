import sequelize from '../../database/connexion_db.js';
import {Book, BookHasReview, Bookshelf, Reader} from '../models/associations.js';

const bookshelfController = {

    async bookshelf (req, res, next){
        try {
        const reader = req.session.reader;
        const myBookshelf = await Bookshelf.findOne({where:{reader_id: `${reader.id}`}});
        console.log(myBookshelf.id);

        res.render('bookshelf')

        
        } catch (error) {
            res.status(500).render("not_found");
        }
    
    },
    // Se déclenche lorsqu'on appuie sur le bouton "ajouter à ma bookshelf" sur la page de présentation du livre
    async addBookToBookshelf (req, res, next) {
        
        try {
            // On récupère l'id de reader dans la session + id du livre à ajouter
            const reader = req.session.reader_id;
            const book = req.body.book_id;
            const bookToAdd = await Book.findOne({where:{book_id: `${book}`}});
            console.log(bookToAdd.id);

            // On récupère l'id de la bookshelf du reader
            const myBookshelf = await Bookshelf.findOne({where:{reader_id: `${reader}`}});  
            console.log(myBookshelf.id);

            // On vérifie que le livre n'est pas déjà dans la bookshelf en comparant les id de bookToAdd et des livres dans MyBookshelf
            const alreadyInBookshelf = await BookInBookshelf.findOne({where:{book_id: `${bookToAdd.id}`, bookshelf_id: `${myBookshelf.id}`}});

            // Si le livre est deja dans la bookshelf, on affiche un message d'erreur
            if (alreadyInBookshelf) {
                //* revoir la route du render
                res.render('bookshelf', {message : 'Ce livre est déjà dans votre bookshelf.'});

            }

            // On ajoute les données du livre dans la bookshelf du reader
            // Par défaut, le statut du livre est "A lire"
            await BookInBookshelf.create({
                book_id: bookToAdd.id,
                bookshelf_id: myBookshelf.id,
                book_title: bookToAdd.title,
                book_status_id: (await BookStatus.findOne({where:{status_name: "A lire"}})).id,
                display: true,
                created_at: new Date(),
                updated_at: new Date()
            });
        
        }catch (error) {
            res.status(500).render("not_found");
        }
}

}

export default bookshelfController;