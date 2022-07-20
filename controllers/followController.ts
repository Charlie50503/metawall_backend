import express from "express";
import Follow from "../models/followModel";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import { successHandle } from "../services/successHandle";
class FollowController {
  public async getFollowing(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { targetId } = req.params;

    if (!targetId) {
      return next(ErrorHandle.appError("400", "沒找到 targetId", next));
    }

    const _result = await Follow.find({
      user: targetId,
      isDeleted:false
    });

    console.log(_result);

    if (!_result) {
      return next(ErrorHandle.appError("400", "沒有找到內容", next));
    }

    successHandle(req, res, _result);
  }
}

export default new FollowController();
