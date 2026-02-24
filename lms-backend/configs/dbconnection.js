import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const {connection} =await mongoose.connect(process.env.MONGO_URI);
    if(connection){
      console.log(`Connected to MongoDB at ${connection.host}`);
    }
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;