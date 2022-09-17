import { CommentCollectionInsert, CommentCollectionSelect, CommentCollectionUpdate } from './../resources/commentCollection';
import { PostCollectionSelect, PostCollectionUpdate } from './../resources/postCollection';
import express from "express";
import mongoose from "mongoose";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
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

    const _isPostExist = await PostCollectionSelect.findOnePost(postId).catch((error) => {
      return next(ErrorHandle.appError("400", "沒有找到貼文", next));
    });

    if (!_isPostExist) {
      return next(ErrorHandle.appError("400", "沒有找到貼文", next));
    }

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const comment: string = req.body["comment"];

    const _createResult = await CommentCollectionInsert.createComment(postId, userId, comment).catch((error) => {
      return next(ErrorHandle.appError("400", "新增留言失敗", next));
    });

    if (!_createResult?.id) {
      return next(ErrorHandle.appError("400", "新增留言失敗", next));
    }

    const _updateResult = await PostCollectionUpdate.addCommentInPost(postId, _createResult.id)
    if (_updateResult?.acknowledged === false) {
      return next(ErrorHandle.appError("400", "添加失敗", next));
    }

    const _findCreatedCommentResult = await CommentCollectionSelect.findCommentAndCreatorInfoById(_createResult.id)

    successHandle(req, res, {
      comment: _findCreatedCommentResult
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

    const _isCommentExist = await CommentCollectionSelect.findOneCommentById(commentId).catch((error) => {
      return next(ErrorHandle.appError("400", "留言不存在", next));
    });

    if (!_isCommentExist) {
      return next(ErrorHandle.appError("400", "留言不存在", next));
    }

    // const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const _updateResult = await CommentCollectionUpdate.deleteCommentById(commentId).catch((error) => {
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
  ) {
    const commentId: mongoose.Types.ObjectId = req.body["commentId"];
    const comment: string = req.body["comment"];

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const _updateResult = await CommentCollectionUpdate.updateCommentContentById(commentId,userId,comment)
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
