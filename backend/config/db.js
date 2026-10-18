const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || process.env.LOCAL_MONGO_URI;
    const conn = await mongoose.connect(connUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Atlas connection failed: ${error.message}. Trying local MongoDB...`);
    try {
      const localConn = await mongoose.connect(process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/unistay");
      console.log(`Local MongoDB Connected: ${localConn.connection.host}`);
    } catch (localError) {
      console.error(`MongoDB connection error: ${localError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
