import express from "express";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import { successHandle } from "../services/successHandle";
import ImgurClient from "imgur";
import * as sizeOf from "image-size"
class UploadController {
  public async image(req: Express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.hasOwnProperty('file')) {
      return next(ErrorHandle.appError("400", "沒找到檔案", next))
    }
    // if(req.file.length <= 0){
    //   return next(appError(400,"尚未上傳檔案",next))
    // }
    // const dimensions = sizeOf(req.file.buffer)
    // if(dimensions.width !== dimensions.height) {
    //   return next(appError(400,"圖片長寬不符合1:1 尺寸",next))
    // }
    const client = new ImgurClient({
      clientId: process.env.IMGUR_CLIENT_ID as string,
      clientSecret: process.env.IMGUR_CLIENT_SECRET as string,
      refreshToken: process.env.IMGUR_REFRESH_TOKEN as string
    })

    const response = await client.upload({
      image: req.file?.buffer.toString('base64'),
      type: 'base64',
      album: process.env.IMGUR_ALBUM_ID
    })

    successHandle(req, res, {
      imgUrl: response.data.link
    })
  }
}


export default new UploadController();
