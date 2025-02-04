import blablapass from '../utils/password.js';
import checkEmail from '../utils/ValidateEmail.js';



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

  async handleLogin(req, res) {
    const {email, password} = req.body;
    // const loginPassword = req.body.password
    try {
      // Vérification sur la DB que l'utilisateur existe bien
      if(email){
        // req.body.email === user.email

        // findOne Sequelize pour retrouver l'email déjà enregistrée
        // hasher le mot de passe saisi par l'utilisateur dans le form
        // comparé le hash avec le mot de passe (qui est hashé) dans la base de donnée
        // si les mots de passes concordent && email valide = connexion réussie
        // Envoie message (login successfull) + redirection homepage
      }
            
      console.log(req.body); // loginPassword);
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
      const mailToVerify = req.body.email;
      const verifiedEmail = checkEmail(mailToVerify)
      if(!verifiedEmail){
        res.render('register', {error : "L'adresse mail n'est pas dans un format valide"})
      }
       
      // comparaison du password et confirm_password

      if(req.body.password === req.body.confirm_password){
        // hashage du mot de passe
        const hashedPassword = blablapass.hashPassword(req.body.password)
        res.render('login', {
          message: 'Vous pouvez maintenant vous connecter !',
      });
          
      }else{
        return res.render('register', { error: "Les mots de passe ne correspondent pas" });
      }

        // Stockage des informations dans la DB
        
        console.log (`${hashedPassword} is registered in database`)
        
        // envoie message confirmation de création du compte

    //   if(!emailValidator.validate(email)) {
    //     return res.render('register', { error: "Email invalide" });
    // }

    // // verifier si password correspond à password confirm
    // const passwordsMatch = password === passwordConfirm;

    // if (!passwordsMatch) {
    //     return res.render('register', { error: "Les mots de passe ne correspondent pas" });
    // }
    

    // // hash password
    // const hashedPassword = await Scrypt.hash(password);
    
    // // attribuer un rôle ici, le role customer.
    // //  Il faut récupérer un role (ici customer) dans la BDD
    // const newCustomerRole  = await  Role.findOne({where:{name: 'customer'}});

    // // sauvegarder user
    // await User.create({
    //     firstname,
    //     lastname,
    //     email,
    //     password: hashedPassword,
    //     role_id: newCustomerRole.id,
    // });

    //!! ne pas modifier cette ligne
    res.render('login', {
        message: 'Vous pouvez maintenant vous connecter !',
    });

      res.render("login");

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

