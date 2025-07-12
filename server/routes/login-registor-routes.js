const express = require('express');
const router = express.Router();
const {userlogin,userRegister} = require('../controllers/Authorization');


router.post('/register',userRegister);
router.post('/login',userlogin);


module.exports = router;