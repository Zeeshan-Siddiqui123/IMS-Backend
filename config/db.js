const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    }
    catch(err){
        console.error("Database connection failed:", err);
        process.exit(1); 
    }
}

mongoose.connection.on('disconnected', () => {
  console.warn("⚠ MongoDB disconnected");
});