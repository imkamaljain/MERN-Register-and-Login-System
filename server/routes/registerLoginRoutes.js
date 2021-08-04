const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/userController');
const userController = new UserController();

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get("/", auth, userController.getUser);

router.post('/logout', userController.logoutUser);

module.exports = router;