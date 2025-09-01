const express = require('express');
const router = express.Router();
const {userlogin,userRegister} = require('../controllers/Authorization');
const {forgetPassword,resetPassword} = require('../controllers/changePassword');


router.post('/register',userRegister);
router.post('/login',userlogin);
router.post('/forgot-password',forgetPassword);
router.post('/reset-password',resetPassword);



module.exports = router;