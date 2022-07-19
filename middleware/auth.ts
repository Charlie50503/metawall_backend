import express from "express";
import jwt from "jsonwebtoken"
import { DotenvParseOutput } from "dotenv"
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import User from "../models/userModel";

interface JwtPayload {
  _id: string
}
export default class Auth {
  public static async checkToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) {
    let token = ""

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.replace('Bearer ', '') as string;
    }

    if (!token) {
      return next(ErrorHandle.appError("401", "沒有登入", next))
    }

    let decoded:any;
    try {
      decoded = await new Promise<string | jwt.JwtPayload | undefined | jwt.VerifyErrors>((resolve, reject) => {
        const { JWT_SECRET } = process.env as DotenvParseOutput

        const result = jwt.verify(token, JWT_SECRET) as { id: string };
        if(!result?.id) { reject("token 錯誤") }
        resolve(result)
      })
    } catch (error: jwt.VerifyErrors | any) {
      next(ErrorHandle.appError("401", "token 不正確", next))
    }

    // const currentUser = await User.findById(decoded['id']);

    // req.user = currentUser

    next()
  }
}