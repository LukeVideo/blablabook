import { Router } from 'express';
import registerController from './controllers/registerController.js';
import sessionController from './controllers/sessionController.js'
import mainController from './controllers/mainController.js';
// import bookController from './controllers/book-controller.js';

const router = Router();

// Définition des routes
// Routes du mainController (concerne la navigation sur les pages d'accueil, login, register et compte utilisateur)
router.get("/", mainController.redirectHomePage);
router.get("/index", mainController.renderHomePage);
router.get("/login", sessionController.renderLoginPage);
router.post("/logout", sessionController.handleLogout);
router.post("/login", sessionController.handleLogin);
router.get("/register", registerController.renderRegisterPage);
router.post("/register", registerController.handleRegister);
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
  res.status(404).render("not_found");
});

export default router;