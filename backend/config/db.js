const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(">mongodb+srv://abdullahiqbal1133:abi54321@cluster0.gofbl0f.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = db;
