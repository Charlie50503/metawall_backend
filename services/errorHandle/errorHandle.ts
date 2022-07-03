import express from "express";
import { customError } from "./interface";
import { HttpError } from "../../utils/error";

export class ErrorHandle {
  public static handleErrorAsync = (func: any) => {
    return function (req: express.Request, res: express.Response, next: express.NextFunction) {
      func(req, res, next).catch(function (error: express.ErrorRequestHandler) {
        return next(error);
      });
    };
  };

  public static resErrorDev = (err: customError | any, res: express.Response) => {
    res.status(res.statusCode).json({
      message: err.message,
      error: err,
      stack: err.stack,
    });
  };

  public static resErrorProd = (err: customError | any, res: express.Response) => {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else {
      console.log("出現重大錯誤", err);
      res.status(500).json({
        status: "error",
        message: "系統錯誤，請洽管理員",
      });
    }
  };

  public static appError = (httpStatus: string, errMessage: string, next: express.NextFunction) => {
    const error = new HttpError(httpStatus, true, errMessage);
    next(error);
  };
}
