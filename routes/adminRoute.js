const express = require("express");
const router = express.Router();
const postController = require("../controllers/postcontroller");

router.post("/post", postController.createPost)
router.get("/post", postController.getPosts)

module.exports = router;