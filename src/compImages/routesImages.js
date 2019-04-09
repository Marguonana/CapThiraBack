const express = require('express');
const bodyParser= require('body-parser')
const router = express.Router();
const actionsImages = require('./actionsImages');

router.use(bodyParser.urlencoded({limit: '100mb' , extended: true }));
router.use(bodyParser.json({limit: '100mb' , extended: true }));
//------------------------------------------------------

router.get('/showoneimage',actionsImages.showImageAction);
router.get('/showallimages', actionsImages.showAllImagesAction);
router.post('/post',actionsImages.addImageAction);
router.delete('/delete/:id',actionsImages.deleteImageAction);

router.put('/update/:id',actionsImages.updateImageAction);

module.exports = router;