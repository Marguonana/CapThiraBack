const express = require('express');
const bodyParser= require('body-parser')
const router = express.Router();
const actionsUsers = require('./actionsUsers');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/:id',actionsUsers.showUserAction);
router.get('/', actionsUsers.showAllUsersAction);
router.post('/post/',actionsUsers.addUserAction);
router.delete('/delete/:id',actionsUsers.deleteUserAction);
router.put('/update/:id',actionsUsers.updateUserAction);
module.exports = router;