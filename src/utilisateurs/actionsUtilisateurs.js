var colUtilisateurs = require('../models/UtilisateursModels');
var ObjectId = require('mongodb').ObjectID

module.exports={
    
    afficherUnUtilisateur:(idUser,res)=>{
        colUtilisateurs.findOne({_id: idUser},(err, user)=> {
            if (err) {throw err}
            console.log("L'utilisateur est : ", user);
            res.end(JSON.stringify(user))         
        });
    },
    
    supprimerUtilisateur:(idUser,res)=>{
        colUtilisateurs.remove({_id: ObjectId(idUser)},(err,User)=>{
            if(err){throw err}
            console.log('Utilisateur Supprimé !')
        })
    },
    
    AfficherTousUtilisateurs:(res)=>{
        colUtilisateurs.find((err, user)=> {
            if (err) {throw err}
            console.log("Les utilisateurs sont : ", user);
            res.end(JSON.stringify(user))         
        });
    },
    
    ajouterUtilisateur:(monUser,res)=>{
        monUser.save(function(err){
            if(err){throw err;}
            console.log('Utilisateur sauvegardé !')
        })
    },
    
    modifierUtilisateur:()=>{
        
    }
}