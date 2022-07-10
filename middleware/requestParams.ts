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
    next();
  }
}