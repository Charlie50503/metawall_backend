import mongoose from "mongoose";
import Post from "../models/postModel";

export class PostCollectionSelect {
  public static async findOnePost(postId: mongoose.Types.ObjectId) {
    return Post.findOne({ _id: postId, isDeleted: false })
  }
  public static async findAllPostList(sortKeyword: 1 | -1) {
    return Post.find({
      isDeleted: false,
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
      .sort({ createdAt: sortKeyword });
  }

  public static async findPersonalPostList(userId: mongoose.Types.ObjectId, sortKeyword: 1 | -1) {
    return Post.find({
      creator: userId,
      isDeleted: false,
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
      .sort({ createdAt: sortKeyword });
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

  public static async searchPostList(regex: RegExp, sortKeyword: 1 | -1) {
    return Post.find({
      content: { $regex: regex },
      isDeleted: false,
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
      .select("+createdAt")
      .sort({ createdAt: sortKeyword });
  }
}

export class PostCollectionUpdate {
  public static async addCommentInPost(postId: mongoose.Types.ObjectId, commentUserId: mongoose.Types.ObjectId){
    const query = { _id: postId, isDeleted: false };
    const updateDocument = {
      $addToSet: { comments: commentUserId },
      upsert: true,
      returnOriginal: false,
      runValidators: true,
    };
    return Post.updateOne(
      query,
      updateDocument,
    );
  }
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

  public static async deletePost(postId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
    return Post.findOneAndUpdate(
      {
        _id: postId,
        creator: userId,
        isDeleted: false,
      },
      { isDeleted: true },
      { upsert: true, returnOriginal: false, runValidators: true }
    );

  }
}

export class PostCollectionInsert {
  public static async createPost(userId: mongoose.Types.ObjectId, content: string, imgUrl: string) {
    return Post.create({
      creator: userId,
      content,
      imgUrl,
    });
  }
}
