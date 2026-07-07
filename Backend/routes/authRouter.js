const express = require('express');
const router = express.Router();

const {registerController, loginController, logoutController, getUserController} = require('../controllers/authControllers');
const JWTverify = require('../middlewares/JWTverify');

router.route('/register').post(registerController);
router.route('/login').post(loginController);
router.route('/logout').post(logoutController);
router.route('/get-me').get(JWTverify, getUserController);

module.exports = router;