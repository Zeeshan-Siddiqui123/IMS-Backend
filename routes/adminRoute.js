const express = require("express");
const router = express.Router();
const postController = require("../controllers/postcontroller");
const upload = require("../config/multerconfig");
const PMcontroller = require("../controllers/PMcontroller");

//admin access posts
router.post("/post", upload.single('image'), postController.createPost)
router.get("/post", postController.getPosts)
router.put("/post/:id", upload.single('image'), postController.updatePost)
router.delete("/post/:id", postController.deletePost)

//admin access PMs
router.post("/pm", PMcontroller.createPM)
router.get("/pm", PMcontroller.getPMs)
router.put("/pm/:id", PMcontroller.updatePM)
router.delete("/pm/:id", PMcontroller.deletePM)

module.exports = router;