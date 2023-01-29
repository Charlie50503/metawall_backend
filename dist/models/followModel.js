"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_2 = require("mongoose");
// 建立 Schema
var followSchema = new mongoose_1.default.Schema({
    // 設計稿 4.追蹤名單
    user: {
        // 自己
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "User",
        select: false,
        unique: true,
    },
    following: [{
            user: {
                // 別人
                type: mongoose_2.Schema.Types.ObjectId,
                ref: "User",
            },
            createdAt: {
                type: Date,
            }
        }],
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
var Follow = mongoose_1.default.model("Follow", followSchema);
exports.default = Follow;
