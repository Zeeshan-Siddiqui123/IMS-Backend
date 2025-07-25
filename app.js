const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
require("dotenv").config();
require("./config/db")();

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.LOCALHOST_URL],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, I am a Server");
});

app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
