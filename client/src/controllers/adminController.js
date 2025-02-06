// IMPORTER ICI

const adminController = {

  async dashboard (req, res){
    try {
    
    // Il faut vérifier que l'utilisateur  (déjà connecté, donc en session), possède le  rôle admin pour accéder à la route
    // Pour ça, on récupère le cookie de session
    // On vérifie le rôle stocké
    // On compare avec le rôle admin dans la BDD
    // si false = redirect vers la page d'accueil
    // out of if pour poursuivre si ===
    // Si === alors ok, admin page


      res.render('dashboard');

    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error");
    }
  },

  }


export default adminController;

