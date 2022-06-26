// models/PostsModel.js
import { Schema } from "mongoose";
import mongoose from "mongoose";
import { PostModelDto } from "./interface/post";
// 建立 Schema
const postsSchema = new mongoose.Schema<PostModelDto>(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "請填寫作者 ID"],
    },
    content: {
      type: String,
      required: [true, "請填寫貼文內容"],
      trim: true,
    },
    imgURL: {
      type: String,
      trim: true,
    },
    // 設計稿 8.我按讚的貼文
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // 留言
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
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
const Post = mongoose.model("Post", postsSchema);

export default Post;
