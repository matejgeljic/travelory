const express = require('express');
const postController = require("../controllers/post");
const validator = require ('../validator');
const authController = require("../controllers/auth");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/", postController.getPosts);
router.post(
    "/post/new/:userId", 
    authController.requireSignin, 
    postController.createPost,  
    /*TODO validator.createPostValidator,*/
);
router.get("/posts/:userId", authController.requireSignin, postController.postsByUser);
router.delete("/post/:postId", authController.requireSignin, postController.isPoster, postController.deletePost);

//any route containing :userId, app will first execute userById()
router.param("userId", userController.userById);
//any route containing :postId, app will first execute pserById()
router.param("postId", postController.postById);

module.exports = router;