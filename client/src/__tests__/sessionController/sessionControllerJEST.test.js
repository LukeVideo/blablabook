// Utilisation de JEST, un framework de test pour JS
// https://jestjs.io/docs/getting-started
// Supertest est une bibliothèque de test pour Express
// https://www.npmjs.com/package/supertest
// Permet de tester les routes d'une application Express en  simulant des requêtes HTTP

//--------------------------------------------------------------
// Pour tester le  fichier sessionController.js
// commandes : 'npm test' ou 'npx jest --verbose' (si Jest est installé uniquement)

//--------------------------------------------------------------


import request from 'supertest';
import sessionController from './../../controllers/sessionController.js';
import {Reader} from './../../models/associations.js';
import blablapass from '../../utils/password.js';
import sanitize from 'sanitize-html';

// Jest permet  de simuler les dépendances pour éviter de vrais appels à la base de données

jest.mock("./../../models/associations.js", () => ({
    Reader: {
       // Remplacement de findOne par un  mock (simulation)
      findOne: jest.fn(),  
    },
  }));

jest.mock('../../utils/password.js', () => ({
  // Simulation de la fonction verifyPassword
  verifyPassword: jest.fn(),
}));

//Test de la fonction handleLogin

// Description du test
describe("Session Controller - handleLogin", () => {
  // Variables pour simuler une requête et une réponse
  let req; 
  let res;

  // Initialisation de req et res avant chaque test de handleLogin
  beforeEach(() => {
    //simulation de la requête
    req = {
      body: {email: "test@mail.com", password: "test"},
      // Avant la connexion, session est un objet vide
      session: {},
    };

    // simulation de la résponse
    res = {
      // simulation de res.render()
      render: jest.fn(),
      // simulation de res.status()
      status: jest.fn().mockReturnThis(),
    };
  });
    
  // Test 1 : utilisateur non trouvé en BDD

  test('Retourne une erreur si l\'utilisateur n\'existe pas', async () =>  {
    // Simule le fait que l'utilisateur est introuvable
    Reader.findOne.mockResolvedValue(null);
    // simule l'appel de handleLogin
    await sessionController.handleLogin(req, res);

    // Vérification de la simulation (res.render affiche un message d'erreur)
    expect(res.render).toHaveBeenCalledWith('login', {message: "identifiants incorrects"}
      );
  });

  // Test 2 : L'utilisateur existe mais mot de passe incorrect
  test('Retourne une erreur si le mot de passe est incorrect', async () => {
    // Simule le fait que l'utilisateur est trouvé en BDD
    Reader.findOne.mockResolvedValue({ reader_password: "hashedpassword" });  
    // Simule un utilisateur trouvé en base
    
    // Simule la soumission d'un mot de passe incorrect
    blablapass.verifyPassword.mockResolvedValue(false);  

    await sessionController.handleLogin(req, res);  // On appelle la fonction handleLogin

    // Vérification de la simulation (res.render affiche un message d'erreur)
    expect(res.render).toHaveBeenCalledWith("login", { message: "identifiants incorrects" });  
  });


    // Test 3 : L'utilisateur entre le bon couple email/mot de passe = Connexion autorisée
    test("Connecte l'utilisateur SSI l'email et mot de passe sont corrects", async () => {
      const mockReader = {
        id: 1,
        nickname: "CrashTest",
        firstname: "Père",
        lastname: "Fusion",
        email: "test@mail.com",
        reader_role_id: 2,
        reader_password: "hashedpassword",
      };
    
      Reader.findOne.mockResolvedValue(mockReader);  // Simule un utilisateur trouvé en base
      blablapass.verifyPassword.mockResolvedValue(true);  // Simule un mot de passe correct
    
      await sessionController.handleLogin(req, res);  // On appelle la fonction handleLogin
    
      // Vérification de la session
      expect(req.session.reader).toEqual({
        id: 1,
        nickname: "CrashTest",
        firstname: "Père",
        lastname: "Fusion",
        email: "test@mail.com",
        reader_role_id: 2,
      });
    
      // Vérification de la simulation (res.render affiche un message de bienvenue avec le bon nom)
      expect(res.render).toHaveBeenCalledWith("login", { message: "Welcome to Blablabook CrashTest", reader: req.session.reader });
    });
});
