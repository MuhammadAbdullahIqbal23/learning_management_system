const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/lms", {
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
