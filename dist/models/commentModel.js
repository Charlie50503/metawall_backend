"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_2 = require("mongoose");
// 建立 Schema
var commentSchema = new mongoose_1.default.Schema({
    creator: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "請填寫作者 ID"],
    },
    postId: {
        type: mongoose_2.Schema.Types.ObjectId,
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
var Comment = mongoose_1.default.model("Comment", commentSchema);
exports.default = Comment;
