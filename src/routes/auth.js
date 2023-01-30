const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.get('/login', authController.indexLogin);
router.post('/login', authController.login);
router.get('/signup', authController.indexSignup);
router.post('/signup', authController.signup);

module.exports = router;
