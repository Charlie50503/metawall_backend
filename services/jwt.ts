import jwt from "jsonwebtoken"
import { DotenvParseOutput } from "dotenv"
import express from "express";
import { ErrorHandle } from "./errorHandle/errorHandle";
export class JWT {
  public static generateJwtToken(id: string): Promise<string> {
    console.log("id",id);
    
    return new Promise((resolve, reject) => {
      const { JWT_SECRET, JWT_EXPIRES_DAY } = process.env as DotenvParseOutput
      const token = jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_DAY
      })
      if (!token) return reject("token 生成錯誤")
      return resolve(token)
    })
  }

  public static async decodeTokenGetId(
    req: express.Request, res: express.Response, next: express.NextFunction
  ) {
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

    return decoded['id'];

    // req.user = currentUser

  }
}