const express = require("express");
const app = express()
const userRoute = require("./routes/userRoute")

const userModel = require("./models/userModel")

require("dotenv").config()
require("./config/db")()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
        res.send('Hello, I am a Server');
});

app.use("/user", userRoute)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
