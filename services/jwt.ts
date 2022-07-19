import jwt from "jsonwebtoken"
import { DotenvParseOutput } from "dotenv"
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
}