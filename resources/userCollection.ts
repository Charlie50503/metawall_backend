import mongoose from "mongoose";
import { updateProfileIF } from "../controllers/userController";
import User from "../models/userModel";

export class UserCollectionSelect {
  public static async findEmail(email: string) {
    return User.findOne({ email });
  }
  public static async findUserById(userId: mongoose.Types.ObjectId) {
    return User.findOne({ _id: userId, isDeleted: false });
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

  public static async updateUserPassword(userId: mongoose.Types.ObjectId, bcryptPassword: string) {
    return User.findByIdAndUpdate(userId, {
      password: bcryptPassword,
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