const postModel = require('../models/postModel')

postcontrller.createPost = async (req, res) => {
    try {
        const { title, description, image, link } = req.body
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = postcontrller