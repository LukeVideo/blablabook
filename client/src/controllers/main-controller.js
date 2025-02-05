import blablapass from '../utils/password.js';
import blablaregex from '../utils/validator.js';
import Reader from '../models/Reader.js'
import Role from '../models/Role.js'
import ExpressSession from 'express-session';


const mainController = {
  async renderHomePage(req, res) {
    try {
      res.render("index");

    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error");
    }
  },
  async renderLoginPage(req, res) {
    try {
      res.render("login");

    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error");
    }
  },

  async handleLogin(req, res, next) {
    const {email, password} = req.body;
    const readerSession = req.session.reader;
    console.log(readerSession);
    // const loginPassword = req.body.password
    try {
      // Vérification sur la DB que l'utilisateur existe bien
      const reader = await  Reader.findOne({where:{email: `${email}`}});
      console.log(reader)
      if(!reader){
       res.render('login', {message:"identifiants incorrects"})
      }
        
      // compare the hashed password in input with hashedPassword in database
      const loginSuccess = blablapass.verifyPassword(reader.reader_password, password)
      if (loginSuccess) {
        req.session.reader = {
          id: reader.id,
          nickname: reader.nickname,
          firstname: reader.firstname,
          lastname: reader.lastname,
          email: reader.email,
          reader_role_id: reader.reader_role_id,
        };

        res.render('index', {message: `Welcome to Blablabook ${req.session.reader.nickname}`})
      }
        // si les mots de passes concordent && email valide = connexion réussie
        // Envoie message (login successfull) + redirection homepage
            
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
       
      // comparaison du password et confirm_password

      // if(req.body.password === req.body.confirm_password){
      //   // hashage du mot de passe
      //   const hashedPassword = blablapass.hashPassword(req.body.password)

          
      // }else{
      //   return res.render('register', { error: "Les mots de passe ne correspondent pas" });
      // }
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
        
        // envoie message confirmation de création du compte

    //   if(!emailValidator.validate(email)) {
    //     return res.render('register', { error: "Email invalide" });
    // }



    // if (!passwordsMatch) {
    //     return res.render('register', { error: "Les mots de passe ne correspondent pas" });
    // }
    

    // // hash password
    // const hashedPassword = await Scrypt.hash(password);
    
    // // attribuer un rôle ici, le role customer.
    // //  Il faut récupérer un role (ici customer) dans la BDD
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
 

//   async renderAccountPage(req, res) {
//     try {
//       res.render("index");

//     } catch (error) {
//       console.error(error);
//       res.status(500).render("pages/error");
//     }
//   },
//   async renderContactPage(req, res) {
//     try {
//       res.render("index");

//     } catch (error) {
//       console.error(error);
//       res.status(500).render("pages/error");
//     }
//   },
//   async renderHomePage(req, res) {
//     try {
//       res.render("index");

//     } catch (error) {
//       console.error(error);
//       res.status(500).render("pages/error");
//     }
//   },


//   async renderNotFoundPage(_, res) {
//     res.status(404).render("pages/not-found");
//   }
};

export default mainController;

