// models/UsersModel.js
import mongoose from "mongoose";
import { UserModelDto } from "./interface/user";

// 建立 Schema
const usersSchema = new mongoose.Schema<UserModelDto>(
  {
    nickName: {
      type: String,
      required: [true, "請填寫暱稱"],
      trim: true,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      default:"male"
    },
    avatar: {
      type: String,
      trim: true,
      default: ""
    },
    email: {
      type: String,
      required: [true, "請填寫 Email"],
      unique: true,
      lowercase: true,
      select: false,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "請填寫密碼"],
      minlength: 8,
      select: false,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

// 建立 Model
const User = mongoose.model("User", usersSchema);

export default User;
