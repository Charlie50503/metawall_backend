"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/PostsModel.js
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
// 建立 Schema
var postsSchema = new mongoose_2.default.Schema({
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "請填寫作者 ID"],
    },
    content: {
        type: String,
        required: [true, "請填寫貼文內容"],
        trim: true,
    },
    imgUrl: {
        type: String,
        trim: true,
    },
    // 設計稿 8.我按讚的貼文
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    // 留言
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
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
}, {
    versionKey: false,
});
// 建立 Model
var Post = mongoose_2.default.model("Post", postsSchema);
exports.default = Post;
