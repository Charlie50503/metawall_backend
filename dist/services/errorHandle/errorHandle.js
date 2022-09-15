"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandle = void 0;
var error_1 = require("../../utils/error");
var ErrorHandle = /** @class */ (function () {
    function ErrorHandle() {
    }
    ErrorHandle.handleErrorAsync = function (func) {
        return function (req, res, next) {
            func(req, res, next).catch(function (error) {
                return next(error);
            });
        };
    };
    ErrorHandle.resErrorDev = function (err, res) {
        res.status(res.statusCode).json({
            message: err.message,
            error: err,
            stack: err.stack,
        });
    };
    ErrorHandle.resErrorProd = function (err, res) {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                message: err.message,
            });
        }
        else {
            console.log("出現重大錯誤", err);
            res.status(500).json({
                status: "error",
                message: "系統錯誤，請洽管理員",
            });
        }
    };
    ErrorHandle.appError = function (httpStatus, errMessage, next) {
        var error = new error_1.HttpError(httpStatus, true, errMessage);
        next(error);
    };
    return ErrorHandle;
}());
exports.ErrorHandle = ErrorHandle;
