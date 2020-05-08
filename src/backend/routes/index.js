const express = require("express");
const userController = require('../controllers/api');
const check_auth = require('../middleware/check-auth');

const router = express.Router();

router.post('/signup',userController.createUser);

router.post('/signin', userController.signIn);

router.post('/seed', userController.seedData);

router.get('/doctors', userController.getDoctors);

router.get('/bookings',check_auth, userController.getBookings);

router.post('/book', check_auth, userController.bookDoctor)


module.exports = router