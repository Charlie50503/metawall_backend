import express from "express";
import { CheckValidator } from "../services/checkValidator"
export default class RequestParams {
  public static signIn(req: express.Request,
    res: express.Response,
    next: express.NextFunction) {
    const { email, password } = req.body
    CheckValidator.checkerParams({ email, password })
    next();
  }
  public static signUp(req: express.Request,
    res: express.Response,
    next: express.NextFunction) {
    const { email, password, confirmPassword, nickName } = req.body
    CheckValidator.checkerParams({ email, password, confirmPassword, nickName })
    CheckValidator.comparePassword({ password, confirmPassword })
    next();
  }
  public static updatePassword(req: express.Request,
    res: express.Response,
    next: express.NextFunction) {
    const { password, confirmPassword } = req.body
    CheckValidator.checkerParams({ password, confirmPassword })
    CheckValidator.comparePassword({ password, confirmPassword })
    next();
  }
  public static patchUpdateProfile(req: express.Request,
    res: express.Response,
    next: express.NextFunction) {
    const { nickName, sex , avatar } = req.body
    CheckValidator.checkerParams({ nickName, sex })
    next();
  }
  public static postCreatePost(req: express.Request,
    res: express.Response,
    next: express.NextFunction) {
    const { content, imgURL } = req.body
    CheckValidator.checkerParams({ content, imgURL })
    next();
  }
}