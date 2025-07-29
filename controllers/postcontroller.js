const postModel = require('../models/postModel')

const postController = {}

postController.createPost = async (req, res) => {
    try {
        const { title, description, image, link } = req.body
        await postModel.create({ title, description, image, link })
        res.status(201).json({ message: "Post created successfully" })
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

postController.getPosts = async (req, res) => {
    try {
        const posts = await postModel.find()
        res.status(200).json(posts)
    } catch (error) {
        console.error("Error getting posts:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = postController