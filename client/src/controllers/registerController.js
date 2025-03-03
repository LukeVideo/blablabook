import ExpressSession from 'express-session';
import sanitize from 'sanitize-html';
import {Reader, Role} from '../models/associations.js';
import blablapass from '../utils/password.js';
import blablaregex from '../utils/validator.js';


const registerController = {
  async renderHomePage(req, res) {
    try {
      res.render("index");

    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error");
    }
  },
  
  async renderRegisterPage(req, res) {

    try {       

      res.render("register");

    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error");
    }
  },

  async handleRegister(req, res, next) {

    const {nickname, firstname, lastname, email, password, confirm_password} = req.body;

    // Vérification du email valide (cf validateEmail.js)
    const firstnameToVerify = sanitize(firstname);
    const lastnameToVerify = sanitize(lastname)
    const nicknameToVerify = sanitize(nickname);
    const mailToVerify = sanitize(email);
    const verifiedEmail = blablaregex.checkEmail(mailToVerify);
    const passToVerify = sanitize(password);
    const confirmPassToVerify = sanitize(confirm_password);
    
    try {

      if(!verifiedEmail){
        res.render('register', {error : "L'adresse mail n'est pas dans un format valide"})
      }

      const strongPass = blablaregex.checkPassword(passToVerify);
      if (!strongPass){
        res.render('register', {
          error: 'mot de passe trop faible !',
        });
      }


      // // verifier si password correspond à password confirm
      // const passwordsMatch = password === passwordConfirm;
      const hashedPassword = await blablapass.checkConfirmPassword(passToVerify, confirmPassToVerify);
      if (!hashedPassword) {
        return res.render('register', { error: "Les mots de passe ne correspondent pas" });

      }
      // verify the email address is not already registered in database
      const emailIsUnavailable = await Reader.findOne({where:{email: `${mailToVerify}`}});
      if (emailIsUnavailable){
        res.render('register', {
          error: 'Cet email est indisponible à la création de compte !',
        });
      }
      // verify the nickname is not already registered in database
      const nickNameIsUnavailable = await Reader.findOne({where:{nickname: `${nicknameToVerify}`}});
      // console.log(nickNameIsUnavailable)
      if (nickNameIsUnavailable){
        res.render('register', {
          error: 'Ce nom d\'utilisateur n\'est pas disponible !',
        });
      }
        // Stockage des informations dans la DB
        
      console.log (`${hashedPassword} is registered in database`)
        
      const reader_default_role  = await  Role.findOne({where:{role_name: 'reader'}});
      // console.log("reader_default_role")
      // console.log(reader_default_role.id)
      // // sauvegarder Reader
      await Reader.create({
        firstname: firstnameToVerify,
        lastname: lastnameToVerify,
        nickname: nicknameToVerify,
        email: mailToVerify,
        reader_password: hashedPassword,
        reader_role_id: reader_default_role.id,
      });

    // const firstnameToVerify 
    // const lastnameToVrify = sanitize(lastname)
    // const nicknameToVerify = sanitize(nickname);
    // const mailToVerify = sanitize(email);
    // const verifiedEmail = blablaregex.checkEmail(mailToVerify);
    // const passToVerify = sanitize(password);
    // const confirmPassToVerify = sanitize(confirm_password);

    res.render('login', {
        message: 'Vous pouvez maintenant vous connecter !',
    });

    } catch (error) {
      console.error(error);
      res.status(500).render("not_found");
    }
  },

};

export default registerController;

