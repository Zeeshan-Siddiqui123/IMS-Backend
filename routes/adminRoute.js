const express = require("express");
const router = express.Router();
const postController = require("../controllers/postcontroller");
const upload = require("../config/multerconfig");

router.post("/post", upload.single('image'), postController.createPost)
router.get("/post", postController.getPosts)
router.put("/post/:id", upload.single('image'), postController.updatePost)
router.delete("/post/:id", postController.deletePost)

module.exports = router;