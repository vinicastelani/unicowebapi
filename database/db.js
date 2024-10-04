import mongoose from "mongoose";

const connectToDB = async () => {
  await mongoose.connect(process.env.URI).then((res) => {
    console.log("Database connection successfull.");
  });
};

export default connectToDB;
