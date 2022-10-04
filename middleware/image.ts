import express from "express";
import path from "path";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import multer from "multer";

export class Image {
  static multerErrorCodeMsg = {
    LIMIT_PART_COUNT: 'Too many parts',
    LIMIT_FILE_SIZE: '圖片size太大',
    LIMIT_FILE_COUNT: 'Too many files',
    LIMIT_FIELD_KEY: 'Field name too long',
    LIMIT_FIELD_VALUE: 'Field value too long',
    LIMIT_FIELD_COUNT: 'Too many fields',
    LIMIT_UNEXPECTED_FILE: '上傳格式錯誤或是文件數量不對或是其他錯誤',
  }
  static multerSettings: multer.Options | undefined = {
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
      const ext = path.extname(file.originalname).toLowerCase()
      if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
        cb(new Error('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。'))
      }
      console.log('this')
      cb(null, true)
    },
  }
  static avatarUpload: any = multer(Image.multerSettings).single('avatar')
  

  public static async uploadOneImg(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction): Promise<void> {
    Image.avatarUpload(req, res, function (err:any) {
      console.log(err)
      if (
        err instanceof multer.MulterError &&
        Image.multerErrorCodeMsg.hasOwnProperty(err.code)
      ) {
        return next(ErrorHandle.appError("400", Image.multerErrorCodeMsg[err.code], next))
      } else if (err) {
        return next(ErrorHandle.appError("500", "上傳圖片失敗!", next))
      }
      next()
    })
  }
  
  

}

// module.exports = { uploadOneImg }
