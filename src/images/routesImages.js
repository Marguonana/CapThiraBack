let express = require('express');
let bodyParser= require('body-parser')
let router = express.Router();
var actionsImages = require('./actionsImages');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/:id',(req,res)=>{
    actionsImages.AfficherUneImage(req,res);
})

router.get('/',(req,res)=>{
    actionsImages.afficherTousLesImages(res);
})

router.post('/post/',(req,res)=>{
    console.log(req.body)
    actionsImages.AjouterImage(req,res);
})

router.delete('/supprimer/:id',(req,res)=>{
    actionsImages.supprimerImage(req,res);
})

router.put('/modifier/:id',(req,res)=>{
    actionsImages.modifierImage(req,res);
})

module.exports = router;