var express = require('express');
var router = express.Router();

const usersController = require('../controllers/user')

/* GET users listing. */
router.post('/', usersController.create);
router.get("/", usersController.findAll);

module.exports = router;
