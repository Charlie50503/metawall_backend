import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({
  path: "setting.env",
});

const { DATABASE, DATABASE_PASSWORD } = process.env;

const url = DATABASE?.replace("<password>", DATABASE_PASSWORD as string) as string;

mongoose.connect(url).then(() => {
  console.log("database connected.");
});
