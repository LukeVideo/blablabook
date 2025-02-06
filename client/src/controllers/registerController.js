import blablapass from '../utils/password.js';
import blablaregex from '../utils/validator.js';
import Reader from '../models/Reader.js';
import Role from '../models/Role.js';
import ExpressSession from 'express-session';


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
    console.log(req.body)
    try {

      // Vérification du email valide (cf validateEmail.js)
      const nicknameToVerify = req.body.nickname;
      const mailToVerify = req.body.email;
      const verifiedEmail = blablaregex.checkEmail(mailToVerify)
      if(!verifiedEmail){
        res.render('register', {error : "L'adresse mail n'est pas dans un format valide"})
      }

      const strongPass = blablaregex.checkPassword(req.body.password)
      if (!strongPass){
        res.render('register', {
          error: 'mot de passe trop faible !',
        });
      }


      // // verifier si password correspond à password confirm
      // const passwordsMatch = password === passwordConfirm;
      const hashedPassword = await blablapass.checkConfirmPassword(req.body.password, req.body.confirm_password)
      if (!hashedPassword) {
        return res.render('register', { error: "Les mots de passe ne correspondent pas" });

      }
      // verify the email address is not already registered in database
      const emailIsUnavailable = await  Reader.findOne({where:{email: `${mailToVerify}`}});
      if (emailIsUnavailable){
        res.render('register', {
          error: 'Cet email est indisponible à la création de compte !',
        });
      }
      // verify the nickname is not already registered in database
      const nickNameIsUnavailable = await  Reader.findOne({where:{nickname: `${nicknameToVerify}`}});
      console.log(nickNameIsUnavailable)
      if (nickNameIsUnavailable){
        res.render('register', {
          error: 'Ce nom d\'utilisateur n\'est pas disponible !',
        });
      }
        // Stockage des informations dans la DB
        
      console.log (`${hashedPassword} is registered in database`)
        
    const reader_default_role  = await  Role.findOne({where:{role_name: 'reader'}});
    console.log("reader_default_role")
    console.log(reader_default_role.id)
    // // sauvegarder Reader
    await Reader.create({
        firstname,
        lastname,
        nickname,
        email,
        reader_password: hashedPassword,
        reader_role_id: reader_default_role.id,
    });

    //!! ne pas modifier cette ligne
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

