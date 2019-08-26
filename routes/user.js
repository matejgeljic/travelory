const express = require('express');
const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const router = express.Router();

router.get("/users", userController.allUsers); 
router.get("/users/:userId", authController.requireSignin, userController.getUser); 
router.put("/users/:userId", authController.requireSignin, userController.updateUser); 
router.delete("/users/:userId", authController.requireSignin, userController.deleteUser); 

//any route containing :userId, app will first execute userById
router.param("userId", userController.userById);

module.exports = router;