import { Router } from 'express';
import mainController from './controllers/main-controller.js';
// import bookController from './controllers/book-controller.js';

const router = Router();

// Définition des routes
// Routes du mainController (concerne la navigation sur les pages d'accueil, login, register et compte utilisateur)
router.get("/", mainController.renderHomePage);
router.get("/login", mainController.renderLoginPage);
router.post("/login", mainController.handleLogin);
router.get("/register", mainController.renderRegisterPage);
router.post("/register", mainController.handleRegister);
// router.get("/user_account", mainController.renderAccountPage);
// router.get("/contact", mainController.renderContactPage);


// Routes du bookController
// router.get("/:nickname/bookshelf", bookController.renderUserBookshelf);
// router.get("/search-results", bookController.displayUserBookshelf);
// router.get("/authors", bookController.fetchAuthors);
// router.get("/categories", bookController.fetchBooksByCategories);
// router.get("/book/:author/:book_title/:book_id", bookController.fetchBookDetails);







//PAS DE ROUTES POUR LES PAGES VERS CGU, MENTIONS LEGALES --> Directement un template EJS






router.use((req, res) => {
  res.status(404).render("not_found");_
});

export default router;