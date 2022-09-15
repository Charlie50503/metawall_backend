"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/UsersModel.js
var mongoose_1 = __importDefault(require("mongoose"));
// 建立 Schema
var usersSchema = new mongoose_1.default.Schema({
    nickName: {
        type: String,
        required: [true, "請填寫暱稱"],
        trim: true,
    },
    sex: {
        // 男性存 0，女性存 1，跨性別存 2
        type: String,
        enum: ["male", "female"],
    },
    avatar: {
        type: String,
        trim: true,
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
}, {
    versionKey: false,
});
// 建立 Model
var User = mongoose_1.default.model("User", usersSchema);
exports.default = User;
