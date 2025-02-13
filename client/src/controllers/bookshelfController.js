import sequelize from '../../database/connexion_db.js';
import {Book, BookHasReview, BookInBookshelf, BookStatus, Bookshelf, Reader } from '../models/associations.js';
import authValidator from '../utils/authentificator.js';

const bookshelfController = {

    async bookshelf (req, res, next){
        try {
        const reader = req.session.reader;
        const myBookshelf = await Bookshelf.findOne({
            where:{reader_id: `${reader.id}`}, 
            include: {
                association : 'books',
                include: 'status'
            }
            });

        console.log(myBookshelf.id);
            console.log('bookshelf :', JSON.stringify(myBookshelf, null, 2));
        res.render('bookshelf')

        
        } catch (error) {
            console.error(error)
            res.status(500).render("not_found");
        }
    
    },
    // Se déclenche lorsqu'on appuie sur le bouton "ajouter à ma bookshelf" sur la page de présentation du livre
    async addBookToBookshelf (req, res) {
        console.log("Appel de bookshelfController.addBookToBookshelf");
        console.log(req.body);
        try {
            // On récupère l'id de reader dans la session + id du livre à ajouter
            const reader = req.session.reader.id;
            console.log(`Id du reader qui demande l'ajout ${reader}`);
            const book = req.body.book_id;
            console.log(`Id du livre à ajouter ${book}`);
            const bookToAdd = await Book.findByPk(book);


            // On récupère l'id de la bookshelf du reader
            const myBookshelf = await Bookshelf.findOne({where:{reader_id: `${reader}`}});  
            console.log('bookshelf id', myBookshelf?.id);

            // On vérifie que le livre n'est pas déjà dans la bookshelf en comparant les id de bookToAdd et des livres dans MyBookshelf
            const alreadyInBookshelf = await BookInBookshelf.findOne({where:{book_id: `${bookToAdd.id}`, bookshelf_id: `${myBookshelf.id}`}});
            console.log('already in bookshelf :', JSON.stringify(alreadyInBookshelf, null, 2))
            // Si le livre est deja dans la bookshelf, on affiche un message d'erreur
            if (alreadyInBookshelf) {
                //* revoir la route du render
                return res.render('bookshelf', {message : 'Ce livre est déjà dans votre bookshelf.'});

            }
            

            // On ajoute les données du livre dans la bookshelf du reader
            // Par défaut, le statut du livre est "A lire"
            const recordCreated = await BookInBookshelf.create({
                book_id: bookToAdd.id,
                bookshelf_id: myBookshelf.id,
                book_title: bookToAdd.title,
                book_status_id: (await BookStatus.findOne({where:{book_status: "à lire"}})).id,
                display: true,
                created_at: new Date(),
                updated_at: new Date()
            });
            console.log('record created : ', JSON.stringify(recordCreated, null, 2))
            //! Ajouter message confirmation de l'ajout dans la bookshelf
            res.redirect('/bookshelf');

        
        }catch (error) {
            console.log(error)
            res.status(500).render("not_found");
        }
}

}

export default bookshelfController;