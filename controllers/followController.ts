import express from "express";
import mongoose from "mongoose";
import Follow from "../models/followModel";
import User from "../models/userModel";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import { JWT } from "../services/jwt";
import { successHandle } from "../services/successHandle";
class FollowController {
  public async getFollowing(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const targetId = req.params["targetId"] as unknown as mongoose.Types.ObjectId;

    if (!targetId) {
      return next(ErrorHandle.appError("400", "沒找到 targetId", next));
    }

    const _result = await Follow.find({
      user: targetId,
      isDeleted: false,
    }).catch((error) => {
      return next(ErrorHandle.appError("400", "沒有找到內容", next));
    });

    console.log(_result);
    successHandle(req, res, _result);
  }

  public async postAddFollowing(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // 強行轉換型別
    const targetId = req.params["targetId"] as unknown as mongoose.Types.ObjectId;

    if (!targetId) {
      return next(ErrorHandle.appError("400", "沒找到 targetId", next));
    }

    await User.find({ _id: targetId, isDeleted: false }).catch((error) => {
      return next(ErrorHandle.appError("400", "不存在該USER", next));
    });

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    if (targetId === userId) {
      return next(ErrorHandle.appError("400", "不能追蹤自己", next));
    }

    const isUserDataExist = await Follow.find({ user: userId });

    if (isUserDataExist?.length > 0) {
      const query = { user: userId };
      const updateDocument = {
        $push: { following: targetId },
        upsert: true,
        returnOriginal: false,
        runValidators: true,
      };
      const options = { $set: { isDeleted: false } };
      const _updateResult = await Follow.updateOne(query, updateDocument, options).catch(
        (error) => {
          return next(ErrorHandle.appError("400", "添加失敗", next));
        }
      );
      if (_updateResult?.acknowledged === false) {
        return next(ErrorHandle.appError("400", "添加失敗", next));
      }
    } else {
      await Follow.create({
        user: userId,
        following: [targetId],
      }).catch((error) => {
        return next(ErrorHandle.appError("400", "新增失敗", next));
      });
    }

    const _result = await Follow.find({ user: userId });

    console.log(_result);
    successHandle(req, res, _result);
  }
}

export default new FollowController();
