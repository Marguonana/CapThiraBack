let colUtilisateurs = require('../models/UtilisateursModels');
let actionsUtilisateurs = require('./actionsUtilisateurs');

module.exports={
    
     AfficherUnUtilisateurs:(id,res)=>{
        actionsUtilisateurs.afficherUnUtilisateur(id,res);
    },
    
    afficherTousLesUtilisateurs:(res)=>{
        actionsUtilisateurs.AfficherTousUtilisateurs(res);
    },
    
    supprimerUtilisateurs:(id,res)=>{
        actionsUtilisateurs.supprimerUtilisateur(id,res);
    },
    
    AjouterUtilisateur:(res)=>{
        var monUser= new colUtilisateurs({
            idUser: 1,
            nom:"ZAIDI",
            prenom:"Mohand Ameziane",
            age:"23",
            mdp: "ZaidiTest"
          })
        actionsUtilisateurs.ajouterUtilisateur(monUser,res);
        res.send('Utilisateur créé !')
    },

    modifierDesDonneesUtilisateurs:(id,res)=>{
      //à définir
    },
}
