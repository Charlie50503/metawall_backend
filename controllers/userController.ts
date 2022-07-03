import express from "express";
import User from "../models/userModel";
import { successHandle } from "../services/successHandle";
import { ErrorHandle } from "../services/errorHandle/errorHandle"
import { UserModelDto } from "../models/interface/user";
export class UsersController {
  public static async getProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { id } = req.params
    const result: UserModelDto | null = await User.findById(id)
    if (!result) {
      return next(ErrorHandle.appError('400', '沒有找到對象USER', next))
    }
    return successHandle(req, res, result)
  }
}

