let express = require('express');
let bodyParser= require('body-parser')
let router = express.Router();
var processUtilisateurs = require('./processUtilisateurs');

console.log('la routes')
router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

router.get('/:id',(req,res)=>{
    processUtilisateurs.AfficherUnUtilisateurs(req.params.id,res);
})

router.get('/',(req,res)=>{
    processUtilisateurs.afficherTousLesUtilisateurs(res);
})

router.post('/postUser',(req,res)=>{
    processUtilisateurs.AjouterUtilisateur(res);
})

router.delete('/supprimer/:id',(req,res)=>{
    processUtilisateurs.supprimerUtilisateurs(req.params.id,res);
})

router.put('/modifier/:id',(req,res)=>{
    processUtilisateurs.modifierDesDonneesUtilisateurs(req.params.id,res);
})

module.exports = router;