const express = require('express');
const AuthController = require("../controllers/auth");
const userController = require("../controllers/user");
const validator = require ('../validator');

const router = express.Router();

router.post("/signup", /*TODO validator.userSignupValidator,*/ AuthController.signup);
router.post("/signin", AuthController.signin);
router.get("/signout", AuthController.signout); 

//any route containing :userId, app will first execute userById
router.param("userId", userController.userById);

module.exports = router;