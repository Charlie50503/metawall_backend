import express from "express";
import mongoose from "mongoose";
import Follow from "../models/followModel";
import { FollowModelDto } from "../models/interface/follow";
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

    const isUserExist = await User.findOne({ _id: targetId, isDeleted: false }).catch((error) => {
      return next(ErrorHandle.appError("400", "不存在該USER", next));
    });

    if (!isUserExist) {
      return next(ErrorHandle.appError("400", "不存在該USER", next));
    }

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    if (targetId === userId) {
      return next(ErrorHandle.appError("400", "不能追蹤自己", next));
    }

    const isUserDataExist = await Follow.find({ user: userId, isDeleted: false });

    if (isUserDataExist?.length > 0) {
      const query = { user: userId, isDeleted: false };
      const updateDocument = {
        $push: { following: targetId },
        upsert: true,
        returnOriginal: false,
        runValidators: true,
      };
      const _updateResult = await Follow.updateOne(query, updateDocument).catch(
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

    const _result = await Follow.findOne({_id:userId,isDeleted:false}).catch((error) => {
      return next(ErrorHandle.appError("400", "沒找到對象USER", next));
    });

    if(!_result){
      return next(ErrorHandle.appError("400", "沒找到對象USER", next));
    }

    console.log(_result);
    successHandle(req, res, _result);
  }

  public async deleteFollowingTarget(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // 強行轉換型別
    const targetId = req.params["targetId"] as unknown as mongoose.Types.ObjectId;

    if (!targetId) {
      return next(ErrorHandle.appError("400", "沒找到 targetId", next));
    }

    const isUserExist = await User.findOne({ _id: targetId, isDeleted: false }).catch((error) => {
      return next(ErrorHandle.appError("400", "不存在該USER", next));
    });

    if (!isUserExist) {
      return next(ErrorHandle.appError("400", "不存在該USER", next));
    }

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    if (targetId === userId) {
      return next(ErrorHandle.appError("400", "不能刪除自己", next));
    }

    const _findResult = await Follow.findOne({ user: userId, isDeleted: false }).catch(error=>{
      return next(ErrorHandle.appError("400", "沒有找到資料", next));
    }) as FollowModelDto

    if(_findResult){
      return next(ErrorHandle.appError("400", "沒有找到資料", next));
    }
    
    const { following } = _findResult;
    if (!following) {
      return next(ErrorHandle.appError("400", "處理不正確", next));
    }
    const targetIndex = following.findIndex((followingUserId) => followingUserId.equals(targetId));

    if (targetIndex === -1) {
      return next(ErrorHandle.appError("400", "已刪除該對象", next));
    }
    following.splice(targetIndex);
    const _updateResult = await Follow.findOneAndUpdate(
      { user: userId, isDeleted: false },
      { following }
    ).catch((error) => {
      return next(ErrorHandle.appError("400", "刪除失敗", next));
    });
    console.log("_updateResult", _updateResult);
    successHandle(req, res, _updateResult);
  }
}

export default new FollowController();
