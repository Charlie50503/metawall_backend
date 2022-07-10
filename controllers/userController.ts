import { JWT } from './../services/jwt';
import express from "express";
import User from "../models/userModel";
import { successHandle } from "../services/successHandle";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import { UserModelDto } from "../models/interface/user";
import bcrypt from "bcryptjs"
class UsersController {
  public async getProfile(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { id } = req.params;
    if (!id) {
      return next(ErrorHandle.appError("400", "沒有找到對象ID", next));
    }
    const result: UserModelDto | null = await User.findById(id);
    if (!result) {
      return next(ErrorHandle.appError("400", "沒有找到對象USER", next));
    }
    return successHandle(req, res, result);
  }

  public async postSignUp(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { email, password: originPassword, nickName } = req.body
    if (await User.findOne({ email })) {
      return next(ErrorHandle.appError("400", "此 Email 已被註冊", next));
    }
    const password = await bcrypt.hash(originPassword, 12)
    const _result = await User.create({
      nickName, email, password
    })
    if (!_result) {
      return next(ErrorHandle.appError("400", "不明原因錯誤", next));
    }
    const token = await JWT.generateJwtToken(_result.id)
    successHandle(req, res, {
      token,
      nickName: _result.nickName
    })
  }

  public async postSignIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { email, password } = req.body
    const user = await User.findOne({email}).select("+password")
    if (!user) {
      return next(ErrorHandle.appError("400", "帳號或密碼錯誤", next));
    }
    const auth = await bcrypt.compare(password, user.password)
    if (!auth){
      return next(ErrorHandle.appError("400", "帳號或密碼錯誤", next));
    }
    const token = await JWT.generateJwtToken(user.id)
    successHandle(req, res, {
      token,
      nickName: user.nickName
    })
  }
}

export default new UsersController();