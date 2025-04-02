import BookHasReview from "../models/BookHasReview.js";
import Reader from "../models/Reader.js";
import Book from "../models/Book.js";

const getLastReviews = async() => {
    try {
        const lastReviews = await BookHasReview.findAll({
            include: [
                { model: Reader, as: 'reader' },
                { model: Book, as: 'book_review' }
                
            ],
            order: [['created_at', 'DESC']], // Trie du plus récent au plus ancien
            limit: 5 // Récupère les 5 derniers
        });
  
        console.log("DEBUG - Derniers avis récupérés :", lastReviews); // ✅ Vérifier que la requête fonctionne
  
  
        return lastReviews;
    } catch (error) {
        return (error);
    }
  }

  export default getLastReviews;