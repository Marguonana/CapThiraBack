const express = require('express');
const bodyParser= require('body-parser')
const router = express.Router();
const actionsUsers = require('./actionsUsers');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// il verifie tout le temps le token
//app.use(actionsUsers.verifTopkenAction)

router.get('/lahlou',actionsUsers.verifTopkenAction)
router.get('/showOneUser/:id',actionsUsers.showUserAction);
router.get('/showAllUsers', actionsUsers.showAllUsersAction);
router.get('/login',actionsUsers.authenticateUserAction);
router.post('/post/',actionsUsers.addUserAction);
router.delete('/delete/:id',actionsUsers.deleteUserAction);
router.put('/update/:id',actionsUsers.updateUserAction);
module.exports = router;