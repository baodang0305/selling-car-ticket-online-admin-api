var express = require('express');
var router = express.Router();

const routeController = require('../controller/route')

router.get('/', routeController.listRoutes);
router.post('/newroute', routeController.NewRoutes);
router.post('/deleteroute', routeController.deleteRoute)
router.post('/newtime', routeController.addTime);
router.post('/newlocation', routeController.addLocation)
module.exports = router;
