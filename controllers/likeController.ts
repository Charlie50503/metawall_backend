import { PostCollectionSelect, PostCollectionUpdate } from './../resources/postCollection';
import express from "express";
import mongoose from "mongoose";
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

    const _likeListResult = await PostCollectionSelect.findPostListByLike(userId).catch((error) => {
      return next(ErrorHandle.appError("400", "沒有找到內容", next));
    });

    console.log(_likeListResult);
    successHandle(req, res, _likeListResult);
  }

  public async postAddLikeOfPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const postId = req.params["postId"] as unknown as mongoose.Types.ObjectId;

    if (!postId) {
      return next(ErrorHandle.appError("400", "沒找到 postId", next));
    }

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const _isPostExist = await PostCollectionSelect.findOnePost(postId);

    if (!_isPostExist) {
      return next(ErrorHandle.appError("400", "貼文不存在", next));
    }

    const _doUpdateResult = await PostCollectionUpdate.addLikeInPost(postId, userId)

    console.log("_doUpdateResult", _doUpdateResult);
    if (_doUpdateResult?.acknowledged === true && _doUpdateResult?.modifiedCount === 0) {
      return next(ErrorHandle.appError("400", "已添加過like", next));
    }
    if (_doUpdateResult?.acknowledged === false) {
      return next(ErrorHandle.appError("400", "添加失敗", next));
    }

    // response data
    const _updatedResult = await PostCollectionSelect.findOnePostWithFullData(postId)

    successHandle(req, res, {
      post: _updatedResult,
      message: "新增成功"
    });
  }

  public async deleteDeleteLikeOfPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const postId = req.params["postId"] as unknown as mongoose.Types.ObjectId;

    if (!postId) {
      return next(ErrorHandle.appError("400", "沒找到 postId", next));
    }

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const _isPostExist = await PostCollectionSelect.findOnePost(postId)

    if (!_isPostExist) {
      return next(ErrorHandle.appError("400", "貼文不存在", next));
    }

    const _updateResult = await PostCollectionUpdate.sliceLikeInPost(postId, userId)
    console.log(_updateResult);

    if (_updateResult?.acknowledged === false) {
      return next(ErrorHandle.appError("400", "添加失敗", next));
    }

    if (_updateResult?.acknowledged === true && _updateResult?.modifiedCount === 0) {
      return next(ErrorHandle.appError("400", "已刪除like", next));
    }

    successHandle(req, res, {
      message: "刪除成功"
    });
  }

}

export default new LikeController();
