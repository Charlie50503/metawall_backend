import mongoose from "mongoose";
import { Schema } from "mongoose";
import { FollowModelDto } from "./interface/follow";
// 建立 Schema
const followSchema = new mongoose.Schema<FollowModelDto>(
  {
    // 設計稿 4.追蹤名單
    user: {
      // 自己
      type: Schema.Types.ObjectId,
      ref: "User",
      select: false,
      unique: true,
    },
    following: [{
      user: {
        // 別人
        type: Schema.Types.ObjectId,
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
  },
  {
    versionKey: false,
  }
);

// 建立 Model
const Follow = mongoose.model("Follow", followSchema);

export default Follow;
