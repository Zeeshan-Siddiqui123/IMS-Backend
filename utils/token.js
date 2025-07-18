const jwt = require("jsonwebtoken")

const UsertokenGenerator = (user) => {
    return jwt.sign({
        email:user.email , id: user._id
    },
    process.env.JWT_SECRET,
    {expiresIn:"1h"}
)}


module.exports = { UsertokenGenerator }