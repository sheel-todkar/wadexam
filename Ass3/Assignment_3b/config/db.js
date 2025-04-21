import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://pawarhitesh321:Hitesh123@assignment3.cgz8r.mongodb.net/YourDatabaseName?retryWrites=true&w=majority&appName=Assignment3');
    console.log("DB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};
