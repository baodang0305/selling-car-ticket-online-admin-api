var express = require('express');
var router = express.Router();

const billController = require('../controller/bills')

router.get('/', billController.listBills);
router.get('/total', billController.Total);

module.exports = router;
