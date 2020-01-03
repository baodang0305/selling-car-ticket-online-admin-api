var express = require('express');
var router = express.Router();
const userController = require('../controller/user')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("API is working properly");
});
// router.get('/', Usercontroller.listUsers);
router.get('/count', userController.count);
router.get('/list', userController.listUsers);
router.post('/updateUser',userController.updateUser);
router.post('/getUser', userController.getUser);
router.post('/deleteUser',userController.deleteUser)
module.exports = router;
