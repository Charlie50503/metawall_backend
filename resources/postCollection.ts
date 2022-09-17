import { PostCollectionSelect } from './postCollection';
import mongoose from "mongoose";
import Post from "../models/postModel";

export class PostCollectionSelect {
  public static async findOnePost(postId: mongoose.Types.ObjectId) {
    return Post.findOne({ _id: postId, isDeleted: false })
  }
  public static async findOnePostWithFullData(postId: mongoose.Types.ObjectId) {
    return Post.findOne({
      _id: postId,
      isDeleted: false
    })
      .populate({
        path: "creator",
        select: "nickName avatar sex",
        match: { isDeleted: { $eq: false } }
      })
      .populate({
        path: "comments",
        select: "creator comment",
        match: { isDeleted: { $eq: false } },
        populate: {
          path: "creator",
          select: "nickName avatar sex"
        }
      })
      .populate({
        path: "likes",
        select: "nickName avatar sex",
        match: { isDeleted: { $eq: false } },
      })
      .select("+createdAt")
  }

  public static async findPostListByLike(userId: mongoose.Types.ObjectId) {
    return Post.find({
      likes: userId,
      isDeleted: false
    })
  }
}

export class PostCollectionUpdate {
  public static async addLikeInPost(postId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
    const query = { _id: postId, isDeleted: false };
    const updateDocument = {
      $addToSet: { likes: userId },
      upsert: true,
      returnOriginal: false,
      runValidators: true,
    };
    return Post.updateOne(
      query,
      updateDocument,
    );
  }

  public static async sliceLikeInPost(postId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
    const query = { _id: postId, isDeleted: false };
    const updateDocument = {
      $pull: { likes: userId },
      upsert: true,
      returnOriginal: false,
      runValidators: true,
    };
    return Post.updateOne(
      query,
      updateDocument,
    );
  }
}