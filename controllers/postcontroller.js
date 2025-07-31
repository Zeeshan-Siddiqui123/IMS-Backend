const postModel = require('../models/postModel')
const path = require("path");
const fs = require("fs");

const postController = {}

postController.createPost = async (req, res) => {
    try {
        const { title, description, link } = req.body;

        const imagePath = `/images/${req.file.filename}`;

        await postModel.create({ title, description, image: imagePath, link });

        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

postController.getPosts = async (req, res) => {
    try {
        const posts = await postModel.find()
        res.status(200).json(posts)
    } catch (error) {
        console.error("Error getting posts:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}



postController.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link, existingImage } = req.body;

    let imagePath = existingImage;

    // if a new file is uploaded, replace the image
    if (req.file) {
      imagePath = `/images/${req.file.filename}`;

      // Delete old image if exists and not same as default
      if (existingImage && fs.existsSync(path.join(__dirname, `../public${existingImage}`))) {
        fs.unlinkSync(path.join(__dirname, `../public${existingImage}`));
      }
    }

    await postModel.findByIdAndUpdate(id, {
      title,
      description,
      link,
      image: imagePath,
    });

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

postController.deletePost = async (req, res) => {
    try {
        const { id } = req.params
        await postModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Post deleted successfully" })
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = postController