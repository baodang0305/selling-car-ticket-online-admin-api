var express = require('express');
var router = express.Router();

const adminController = require('../controller/admin')

router.get('/', adminController.defaultRouter);

router.post('/login', adminController.loginUser)

router.post('/register',adminController.registerUser);

router.get('/me', adminController.getUser);

router.get('/list', adminController.listUsers);

router.get('/logout' , adminController.logout)

router.post('/getUser', adminController.getUserByEmail);
router.post('/updateWallet', adminController.updateWallet);
module.exports = router;
