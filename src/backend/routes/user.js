const express = require('express');
const router = express.Router();
const userController = require('../controllers/api');

router.post('/register',userController.createUser);

router.post('/login', userController.signIn);


module.exports = router;
