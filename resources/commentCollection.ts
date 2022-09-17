import mongoose from "mongoose";
import Comment from "../models/commentModel";

export class CommentCollectionSelect {
  public static async findOneCommentById(commentId: mongoose.Types.ObjectId) {
    return Comment.findOne({ _id: commentId, isDeleted: false })
  }
  public static async findCommentAndCreatorInfoById(commentId: mongoose.Types.ObjectId) {
    return Comment.findById(commentId).populate(
      {
        path: "creator",
        select: "nickName avatar sex"
      })
  }

}

export class CommentCollectionUpdate {
  public static async deleteCommentById(commentId: mongoose.Types.ObjectId) {
    return Comment.findByIdAndUpdate(commentId, { isDeleted: true })
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
}

export class CommentCollectionInsert {
  public static async createComment(postId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId, comment: string) {
    return Comment.create({
      creator: userId,
      postId,
      comment,
    })
  }
}