// Load environnment variables from .env
import 'dotenv/config';

// Import middleware loadUserToLocals data
import loadReaderToLocals from './src/utils/loadReaderToLocals.js';

// Import NPM modules
import express from 'express';

// Import local modules
import router from './src/router.js';

// Import  express session to  manage user sessions
import expressSession from 'express-session';

// import errorsHandler middlewares to manage errors
import {notFound, developmentErrors} from './src/utils/errorsHandler.js';

// Create Express app
const app = express();
// Configure express-session
app.use(expressSession({
  secret: process.env.SECRET_KEY, // secret key to sign session
  resave : false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  cookie: {secure: false}, // use http
  maxAge: 1000*60*10 // 2 minutes
}))

// Using locals to store Reader session datas
app.use(loadReaderToLocals);

// Configure view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Configure assets routes (static folder)
app.use(express.static("./src/public"));

// Use built-in middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));


// Favicon static route
app.use("/favicon.ico", express.static("./public/images/logo.svg"));

// Plug routes on app
app.use(router);

app.use(notFound);
app.use(developmentErrors);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Blablabook app started at http://localhost:${PORT}`);
});