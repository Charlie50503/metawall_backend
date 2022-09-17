import mongoose from "mongoose";
import { UserCollectionSelect, UserCollectionInsert, UserCollectionUpdate } from './../resources/userCollection';
import { JWT } from "./../services/jwt";
import express from "express";
import User from "../models/userModel";
import { successHandle } from "../services/successHandle";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import { UserModelDto } from "../models/interface/user";
import bcrypt from "bcryptjs";

export interface updateProfileIF {
  nickName: string;
  sex: string;
  avatar?: string;
}
interface updatePasswordIF {
  password: string;
  confirmPassword: string;
}

class UsersController {
  public async getProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = req.params["id"] as unknown as mongoose.Types.ObjectId;
    if (!id) {
      return next(ErrorHandle.appError("400", "沒有找到對象ID", next));
    }
    const result: UserModelDto | null = await UserCollectionSelect.findUserById(id);
    if (!result) {
      return next(ErrorHandle.appError("400", "沒有找到對象USER", next));
    }
    return successHandle(req, res, result);
  }

  public async patchUpdateProfile(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { nickName, sex, avatar } = req.body as updateProfileIF;

    const userId = await JWT.decodeTokenGetId(req, res, next) as mongoose.Types.ObjectId;
    console.log("userId", userId);

    const updateData: updateProfileIF = {
      nickName,
      sex,
    };
    if (avatar?.length !== 0) {
      updateData["avatar"] = avatar;
    }
    const _result = await UserCollectionUpdate.findUserAndUpdate(userId, updateData);
    if (!_result) {
      return next(ErrorHandle.appError("400", "更新失敗", next));
    }

    successHandle(req, res, _result);
  }

  public async patchUpdatePassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { password, confirmPassword } = req.body as updatePasswordIF;

    const bcryptPassword = await bcrypt.hash(password, 12);
    const userId = await JWT.decodeTokenGetId(req, res, next) as mongoose.Types.ObjectId;

    const _result = await User.findByIdAndUpdate(userId, {
      password: bcryptPassword,
    });

    if (!_result) {
      return next(ErrorHandle.appError("400", "密碼更新失敗", next));
    }

    successHandle(req, res, {
      message: "密碼更新成功",
    });
  }

  public async postSignUp(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { email, password: originPassword, nickName } = req.body;
    if (await UserCollectionSelect.findEmail(email)) {
      return next(ErrorHandle.appError("400", "此 Email 已被註冊", next));
    }
    const password = await bcrypt.hash(originPassword, 12);
    const _result = await UserCollectionInsert.createUser(nickName, email, password)
    if (!_result) {
      return next(ErrorHandle.appError("400", "不明原因錯誤", next));
    }
    const token = await JWT.generateJwtToken(_result.id);
    successHandle(req, res, {
      token,
      nickName: _result.nickName,
    });
  }

  public async postSignIn(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { email, password } = req.body;
    const user = await UserCollectionSelect.findUserIncludePasswordByEmail(email)
    if (!user) {
      return next(ErrorHandle.appError("400", "帳號或密碼錯誤", next));
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return next(ErrorHandle.appError("400", "帳號或密碼錯誤", next));
    }
    const token = await JWT.generateJwtToken(user.id);
    successHandle(req, res, {
      token,
      nickName: user.nickName,
    });
  }
}

export default new UsersController();
