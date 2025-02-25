import { Router } from 'express';
import adminController from './controllers/adminController.js';
import authorController from './controllers/authorController.js';
import bookController from "./controllers/bookController.js"
import bookshelfController from './controllers/bookshelfController.js';
import mainController from './controllers/mainController.js';
import registerController from './controllers/registerController.js';
import sessionController from './controllers/sessionController.js';
import authValidator from './utils/authentificator.js';
import isAdmin from './utils/isAdmin.js';
// import bookController from './controllers/book-controller.js';

const router = Router();

// Définition des routes
// Routes du mainController (concerne la navigation sur les pages d'accueil, login, register et compte utilisateur)
router.get("/", mainController.redirectHomePage);
router.get("/index", mainController.renderHomePage);
router.get("/cgu", mainController.renderCGU);
router.get("/contact", mainController.renderContactPage);
router.get("/mentions", mainController.renderMentionsPage);
router.get("/sendMailToAdmin", mainController.sendMailToAdmin);

router.get("/register", registerController.renderRegisterPage);
router.post("/register", registerController.handleRegister);

router.get("/login", sessionController.renderLoginPage);
router.post("/logout", sessionController.handleLogout);
router.post("/login", sessionController.handleLogin);

router.get("/dashboard", [authValidator, isAdmin], adminController.dashboard);

router.get("/api/search", [authValidator, isAdmin], adminController.searchBookFromAPI);
router.post("/api/getBookList", [authValidator, isAdmin], adminController.getBookList);

router.post("/addBookToBookshelf", bookshelfController.addBookToBookshelf);
router.post("/deleteBookFromBookshelf", bookshelfController.deleteBookFromBookshelf);

router.post("/api/addBookToDB", [authValidator, isAdmin], adminController.addBookToDB);

router.get('/book/:id', bookController.bookDetails);

router.get("/search", bookController.search);
router.post("/search", bookController.handleSearch);

router.get("/bookshelf", [authValidator], bookshelfController.displayBookshelf);

router.get("/author/:id", authorController.renderAuthorPage);


router.post("/test", mainController.test);




// router.get("/user_account", mainController.renderAccountPage);
// router.get("/contact", mainController.renderContactPage);

// Routes du bookController
// router.get("/:nickname/bookshelf", bookController.renderUserBookshelf);
// router.get("/search-results", bookController.displayUserBookshelf);
// router.get("/authors", bookController.fetchAuthors);
// router.get("/categories", bookController.fetchBooksByCategories);
// router.get("/book/:author/:book_title/:book_id", bookController.fetchBookDetails);

//PAS DE ROUTES POUR LES PAGES VERS CGU, MENTIONS LEGALES --> Directement un template EJS

// Remplacé par le middleware errorsHandler.notfound (dans index.js)
// router.use((req, res) => {
//   res.status(404).render("not_found");
// });

export default router;