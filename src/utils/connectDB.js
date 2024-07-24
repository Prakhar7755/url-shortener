import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);

    console.log("🌸 MongoDB Connected !!💮".toUpperCase());
  } catch (error) {
    console.error("\nMongoDB connection failed\n", error);
    process.exit(1);
  }
};

export default connectDB;
