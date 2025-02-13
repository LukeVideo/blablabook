// Importation de notre contrôleur de session à tester
import sessionController from '../../controllers/sessionController.js';
import sanitize from 'sanitize-html';
import assert from 'assert';

//* Test de la fonction handleLogin
//* Partie 1 : Initialisation du test avec les objets simulés (req, res)

// Simulation de la requête envoyée à sessionController
const req = {
// Simulation du req.body
  body: {
    email: sanitize("test@example.com"),  
    password: sanitize("password123") 
  },
  // Simulation de la session, vide avant connexion
  session: {}
};
// Simulation de la réponse renvoyé par sessionController
const res = {
  
  // Simulation du rendu de vue avec données
  render: (login, data) => {
    console.log(`Rendered view: ${login}`);
    if (data) {
      console.log(`Data collected : ${data}`);
    }
  },
  
  // Simulation de la redirection vers une autre page
  redirect: (url) => {
    console.log(`Redirected to: ${url}`);
  },
  
  // Méthode `status` simulée pour définir le code HTTP de la réponse
  status: (status) => {
    // Renvoie le status de l'erreur
    console.log(`Status: ${status}`);
    return this;  // Retourne l'objet `res` pour permettre un enchaînement de méthodes (comme dans Express)
  }
};

// Test de la méthode `renderLoginPage`
console.log("TEST: renderLoginPage");
sessionController.renderLoginPage(req, res).then(() => {
  console.log("enderLoginPage terminé !"); 
}).catch(err => {
  console.error("Erreur dans renderLoginPage :", err); 
});

// Test de la méthode `handleLogin`
console.log("TEST: handleLogin");
sessionController.handleLogin(req, res).then(() => {
  console.log("handleLogin terminé !");  
}).catch(err => {
  console.error("Erreur dans handleLogin :", err);  
});

// Test de la méthode `handleLogout`
console.log("TEST: handleLogout");
sessionController.handleLogout(req, res).then(() => {
  console.log("handleLogout terminé !");  
}).catch(err => {
  console.error("Erreur dans handleLogout :", err);  
});
