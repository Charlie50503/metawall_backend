import mongoose from "mongoose";
import { Schema } from "mongoose";
import { CommentModelDto } from "./interface/comment";
// 建立 Schema
const commentSchema = new mongoose.Schema<CommentModelDto>(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "請填寫作者 ID"],
        },
        postId: {
            type: Schema.Types.ObjectId,
            required: [true, "請填寫貼文ID"],
        },
        comment: {
            type: String,
            required: [true, "請填寫留言內容"],
            trim: true,
        },
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
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
