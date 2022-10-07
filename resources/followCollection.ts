import mongoose from "mongoose";
import Comment from "../models/commentModel";
import Follow from "../models/followModel";

export class FollowCollectionSelect {
  public static async findFollowingInUser(userId: mongoose.Types.ObjectId, targetId: mongoose.Types.ObjectId) {
    return Follow.findOne({ user: userId, isDeleted: false,
        following: { $in: [targetId] }
    })
  }

  public static async findFollowByUserId(userId: mongoose.Types.ObjectId) {
    return Follow.findOne({ user: userId, isDeleted: false })
  }

  public static async findFollowList(targetId: mongoose.Types.ObjectId) {
    return Follow.findOne({
      user: targetId,
      isDeleted: false,
    })
  }
  public static async findCommentAndCreatorInfoById(commentId: mongoose.Types.ObjectId) {
    return Comment.findById(commentId).populate(
      {
        path: "creator",
        select: "nickName avatar sex"
      })
  }

  public static async findUserData(userId: mongoose.Types.ObjectId) {
    return Follow.findOne({ user: userId, isDeleted: false })
  }
}

export class FollowCollectionUpdate {
  public static async addUserInFollow(userId: mongoose.Types.ObjectId, targetId: mongoose.Types.ObjectId) {
    const query = { user: userId, isDeleted: false };
    const updateDocument = {
      $push: { following: targetId },
      upsert: true,
      returnOriginal: false,
      runValidators: true,
    };
    return Follow.updateOne(query, updateDocument)
  }

  public static async updateCommentContentById(commentId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId, comment: string) {
    return Comment.findOneAndUpdate({
      _id: commentId,
      creator: userId,
      isDeleted: false
    }, {
      comment: comment
    },
      { upsert: true, returnOriginal: false, runValidators: true })
  }

  public static async sliceFollowTarget(userId: mongoose.Types.ObjectId, following: mongoose.Types.ObjectId[]) {
    return Follow.findOneAndUpdate(
      { user: userId, isDeleted: false },
      { following },
      { upsert: true, returnOriginal: false, runValidators: true })
  }
}

export class FollowCollectionInsert {
  public static async createFollow(userId: mongoose.Types.ObjectId, targetId: mongoose.Types.ObjectId) {
    return Follow.create({
      user: userId,
      following: [targetId],
    })
  }
}