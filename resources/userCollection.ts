import mongoose from "mongoose";
import { updateProfileIF } from "../controllers/userController";
import Comment from "../models/commentModel";
import User from "../models/userModel";

export class UserCollectionSelect {
  public static async findEmail(email: string) {
    return User.findOne({ email });
  }
  public static async findUserById(userId: mongoose.Types.ObjectId) {
    return User.findOne({ _id: userId, isDeleted: false });
  }
  public static async findCommentAndCreatorInfoById(commentId: mongoose.Types.ObjectId) {
    return Comment.findById(commentId).populate(
      {
        path: "creator",
        select: "nickName avatar sex"
      })
  }

  public static async findUserIncludePasswordByEmail(email: string) {
    return User.findOne({ email }).select("+password");
  }

}

export class UserCollectionUpdate {
  public static async findUserAndUpdate(userId: mongoose.Types.ObjectId, updateData: updateProfileIF) {
    return User.findByIdAndUpdate(userId, updateData, {
      upsert: true,
      returnOriginal: false,
      runValidators: true,
    });
  }
}

export class UserCollectionInsert {
  public static async createUser(nickName: string, email: string, password: string) {
    return User.create({
      nickName,
      email,
      password,
    });
  }
}