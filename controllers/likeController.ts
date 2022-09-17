import express from "express";
import mongoose from "mongoose";
import Post from "../models/postModel";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import { JWT } from "../services/jwt";
import { successHandle } from "../services/successHandle";
class LikeController {
  public async getUserLikeList(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = req.params["userId"] as unknown as mongoose.Types.ObjectId;

    if (!userId) {
      return next(ErrorHandle.appError("400", "沒找到 userId", next));
    }

    console.log("userId",userId);
    

    const _likeListResult = await Post.find({
      likes:userId,
      isDeleted: false
    }).catch((error) => {
      return next(ErrorHandle.appError("400", "沒有找到內容", next));
    });

    console.log(_likeListResult);
    successHandle(req, res, _likeListResult);
  }

  public async postAddLikeOfPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ){
    const postId = req.params["postId"] as unknown as mongoose.Types.ObjectId;

    if (!postId) {
      return next(ErrorHandle.appError("400", "沒找到 postId", next));
    }

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const _isPostExist = await Post.findOne({ _id: postId ,isDeleted:false })

    if(!_isPostExist){
      return next(ErrorHandle.appError("400", "貼文不存在", next));
    }

    const query = { _id: postId ,isDeleted:false };
    const updateDocument = {
      $addToSet: { likes: userId },
      upsert: true,
      returnOriginal: false,
      runValidators: true,
    };
    const _doUpdateResult = await Post.updateOne(
      query,
      updateDocument,
    );

    console.log("_doUpdateResult",_doUpdateResult);
    if(_doUpdateResult?.acknowledged===true && _doUpdateResult?.modifiedCount===0){
      return next(ErrorHandle.appError("400", "已添加過like", next));
    }
    if (_doUpdateResult?.acknowledged === false) {
      return next(ErrorHandle.appError("400", "添加失敗", next));
    }

    // response data
    const _updatedResult = await Post.findOne({
      _id: postId,
      isDeleted:false 
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
        populate: {
          path: "user",
          select: "nickName avatar sex"
        }
      })
      .select("+createdAt")

    successHandle(req, res, {
      post:_updatedResult,
      message: "新增成功"
    });
  }

  public async deleteDeleteLikeOfPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ){
    const postId = req.params["postId"] as unknown as mongoose.Types.ObjectId;

    if (!postId) {
      return next(ErrorHandle.appError("400", "沒找到 postId", next));
    }

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const _isPostExist = await Post.findOne({ _id: postId ,isDeleted:false })

    if(!_isPostExist){
      return next(ErrorHandle.appError("400", "貼文不存在", next));
    }

    const query = { _id: postId ,isDeleted:false };
    const updateDocument = {
      $pull: { likes: userId },
      upsert: true,
      returnOriginal: false,
      runValidators: true,
    };
    const _updateResult = await Post.updateOne(
      query,
      updateDocument,
    );
    console.log(_updateResult);
    
    if (_updateResult?.acknowledged === false) {
      return next(ErrorHandle.appError("400", "添加失敗", next));
    }

    if(_updateResult?.acknowledged===true && _updateResult?.modifiedCount===0){
      return next(ErrorHandle.appError("400", "已刪除like", next));
    }

    successHandle(req, res, {
      message: "刪除成功"
    });
  }

}

export default new LikeController();
