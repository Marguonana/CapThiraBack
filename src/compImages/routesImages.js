const express = require('express');
const bodyParser= require('body-parser')
const router = express.Router();
const actionsImages = require('./actionsImages');

router.use(bodyParser.urlencoded({limit: '100mb' , extended: true }));
router.use(bodyParser.json({limit: '100mb' , extended: true }));
//------------------------------------------------------

router.get('/showoneimage/:idUser/:key',actionsImages.showImageAction);
router.get('/showallimages/:idUser', actionsImages.showAllImagesAction);
router.get('/showallimagessubscriptions/:idUser',actionsImages.showAllImagesSubscriptionsAction)

router.post('/post',actionsImages.addImageAction);
router.delete('/delete/:id/:key',actionsImages.deleteImageAction);

router.post('/like', actionsImages.likeAction);
router.get('/showalllike/:idImage', actionsImages.showAllLikeAction);

//router.put('/update/:id',actionsImages.updateImageAction);

module.exports = router;