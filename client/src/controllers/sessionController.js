
import sanitize from 'sanitize-html';
import {Reader, Role} from '../models/associations.js';
import blablapass from '../utils/password.js';
import blablaregex from '../utils/validator.js';


const sessionController = {
  

async renderLoginPage(req, res) {

  try {
    res.render("loginOrRegister");

  } catch (error) {
    console.error(error);
    res.status(500).render("error");
  }
},

async handleLogin(req, res) {
  
  const email = sanitize(req.body.email);
  const password = sanitize(req.body.password);

  try {
    // Check that user is registered in the database
    const reader = await Reader.findOne({where:{email: email}});
    
    if(!reader){
      return res.render('loginOrRegister', {
        message: "identifiants incorrects",
        error: null
      });
    }
      
    // compare the hashed password in input with hashedPassword in database
    const loginSuccess = await blablapass.verifyPassword(reader.reader_password, password);
    
    if (!loginSuccess) {
      return res.render('loginOrRegister', {
        message: "identifiants incorrects",
        error: null
      });
    }

    // Delete the password used to log in the session
    reader.reader_password = null;

    // Add user datas to the session
    req.session.reader = {
      id: reader.id,
      nickname: reader.nickname,
      firstname: reader.firstname,
      lastname: reader.lastname,
      email: reader.email,
      reader_role_id: reader.reader_role_id,
    };

    // Redirection vers la page d'accueil après connexion réussie
    return res.render('loginOrRegister', {
      message: `Welcome to Blablabook ${req.session.reader.nickname}`,
      reader: req.session.reader,
      error: null
    });
    

  } catch (error) {
    console.error(error);
    res.status(500).render("error");
  }
},

async handleLogout (req, res){
  try {
    // console.log(`Nickname de la session à detruire: ${req.session.reader.nickname}`);
    req.session.destroy();
    // console.log(`Session détruite: ${req.session}`);
    res.redirect('/index');

  } catch (error) {
    console.error(error);
    res.status(500).render("pages/error");
  }
},

}

export default sessionController;
