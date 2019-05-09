const express = require('express');
const bodyParser= require('body-parser')
const router = express.Router();
const actionsUsers = require('./actionsUsers');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// il verifie tout le temps le token
//app.use(actionsUsers.verifTopkenAction)


router.get('/showoneuser/:id',actionsUsers.showUserAction);
router.get('/showallusers', actionsUsers.showAllUsersAction);
router.get('/login/:username/:password',actionsUsers.authenticateUserAction);
router.post('/post',actionsUsers.addUserAction);

router.delete('/delete/:id',actionsUsers.deleteUserAction);
router.put('/update/:id',actionsUsers.updateUserAction);

//router.get('/search/:strSearch',actionsUsers.shearchUsersActions);

module.exports = router;
