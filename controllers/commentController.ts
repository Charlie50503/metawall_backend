import express from "express";
import mongoose from "mongoose";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import Comment from "../models/commentModel";
import Post from "../models/postModel";
import { JWT } from "../services/jwt";
import { successHandle } from "../services/successHandle";
class CommentController {
  public async postCreateComment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const postId = req.params["postId"] as unknown as mongoose.Types.ObjectId;

    if (!postId) {
      return next(ErrorHandle.appError("400", "沒找到 postId", next));
    }

    const _isPostExist = await Post.findOne({ _id: postId, isDeleted: false }).catch((error) => {
      return next(ErrorHandle.appError("400", "沒有找到貼文", next));
    });

    if (!_isPostExist) {
      return next(ErrorHandle.appError("400", "沒有找到貼文", next));
    }

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const comment: string = req.body["comment"];

    const _createResult = await Comment.create({
      creator: userId,
      postId,
      comment,
    }).catch((error) => {
      return next(ErrorHandle.appError("400", "新增留言失敗", next));
    });

    if (!_createResult?.id) {
      return next(ErrorHandle.appError("400", "新增留言失敗", next));
    }

    const query = { _id: postId ,isDeleted: false};
    const updateDocument = {
      $addToSet: { comments: _createResult.id },
      upsert: true,
      returnOriginal: false,
      runValidators: true,
    };
    const _updateResult = await Post.updateOne(
      query,
      updateDocument,
    );
    if (_updateResult?.acknowledged === false) {
      return next(ErrorHandle.appError("400", "添加失敗", next));
    }
    successHandle(req, res, {
      message: "新增成功"
    });
  }

  public async deleteDeleteComment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const commentId = req.params["commentId"] as unknown as mongoose.Types.ObjectId;

    if (!commentId) {
      return next(ErrorHandle.appError("400", "沒找到 commentId", next));
    }

    const _isCommentExist = await Comment.findOne({ _id: commentId, isDeleted: false }).catch((error) => {
      return next(ErrorHandle.appError("400", "留言不存在", next));
    });

    if (!_isCommentExist) {
      return next(ErrorHandle.appError("400", "留言不存在", next));
    }

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const _updateResult = await Comment.findByIdAndUpdate(commentId, { isDeleted: true }).catch((error) => {
      return next(ErrorHandle.appError("400", "更新失敗", next));
    });


    successHandle(req, res, {
      message: "刪除成功"
    });
  }

  public async patchEditComment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ){
    const commentId:mongoose.Types.ObjectId = req.body["commentId"];
    const comment: string = req.body["comment"];

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const _updateResult = await Comment.findOneAndUpdate({
      _id:commentId,
      creator:userId,
      isDeleted:false
    },{
      comment:comment
    },
    { upsert: true, returnOriginal: false, runValidators: true })
    .catch((error) => {
      return next(ErrorHandle.appError("400", "更新失敗", next));
    });

    console.log(_updateResult);

    if (!_updateResult) {
      return next(ErrorHandle.appError("400", "更新失敗", next));
    }
    
    successHandle(req, res, {
      message: "更新成功"
    });
    
  }
}

export default new CommentController();
