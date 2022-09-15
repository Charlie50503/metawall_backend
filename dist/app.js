"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var errorHandle_1 = require("./services/errorHandle/errorHandle");
var index_1 = __importDefault(require("./routes/index"));
var user_1 = __importDefault(require("./routes/user"));
var post_1 = __importDefault(require("./routes/post"));
var follow_1 = __importDefault(require("./routes/follow"));
var comment_1 = __importDefault(require("./routes/comment"));
var like_1 = __importDefault(require("./routes/like"));
var app = (0, express_1.default)();
// 程式出現重大錯誤時
process.on("uncaughtException", function (err) {
    // 記錄錯誤下來，等到服務都處理完後，停掉該 process
    console.error("Uncaught Exception！");
    console.error(err);
    process.exit(1);
});
require("./connections");
// import { errorHandle} from "./services/errorHandle"
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/", index_1.default);
app.use("/user", user_1.default);
app.use("/post", post_1.default);
app.use("/follow", follow_1.default);
app.use("/comment", comment_1.default);
app.use("/like", like_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({ status: 'error', message: '無此路由' });
    // next(createError(404));
});
app.use(function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === "dev") {
        return errorHandle_1.ErrorHandle.resErrorDev(err, res);
    }
    //production
    if (err.name === "ValidationError") {
        err.name = "資料欄位未填寫正確，請重新輸入";
        err.isOperational = true;
        return errorHandle_1.ErrorHandle.resErrorProd(err, res);
    }
    errorHandle_1.ErrorHandle.resErrorProd(err, res);
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
process.on("unhandledRejection", function (error, promise) {
    console.error("未捕捉到 rejection:", promise, "原因", error);
});
exports.default = app;
