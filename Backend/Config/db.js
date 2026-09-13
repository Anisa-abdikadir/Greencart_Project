import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error.message);

    // Important: stop server startup if MongoDB is not connected
    throw error;
  }
};

export default ConnectDb;