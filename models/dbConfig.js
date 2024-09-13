import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database connected!");
    })
    .catch(err => {
      console.log(err);
    });
};

export default connectDB;
