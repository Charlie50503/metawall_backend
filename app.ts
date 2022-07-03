import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { ErrorHandle } from "./services/errorHandle/errorHandle"
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import postRouter from "./routes/post";

const app = express();

// 程式出現重大錯誤時
process.on('uncaughtException', err => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
	console.error('Uncaught Exception！')
	console.error(err);
	process.exit(1);
});

import "./connections";
// import { errorHandle} from "./services/errorHandle"
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  err.statusCode = err.statusCode || 500
  if (process.env.NODE_ENV === 'dev') {
    return ErrorHandle.resErrorDev(err, res)
  }

  //production
  if (err.name === 'ValidationError') {
    err.name = '資料欄位未填寫正確，請重新輸入'
    err.isOperational = true
    return ErrorHandle.resErrorProd(err, res)
  }
  ErrorHandle.resErrorProd(err, res)
})

// error handler
app.use(function (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


process.on('unhandledRejection',(error,promise)=>{
  console.error('未捕捉到 rejection:',promise,'原因',error)
})
export default app;
