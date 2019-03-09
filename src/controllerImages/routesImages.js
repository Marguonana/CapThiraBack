const express = require('express');
const bodyParser= require('body-parser')
const router = express.Router();
const actionsImages = require('./actionsImages');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/:id',actionsImages.showImageAction);
router.get('/', actionsImages.showAllImagesAction);
router.post('/post',actionsImages.addImageAction);
router.delete('/delete/:id',actionsImages.deleteImageAction);
router.put('/update/:id',actionsImages.updateImageAction);

module.exports = router;