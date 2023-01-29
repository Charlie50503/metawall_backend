"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkValidator_1 = require("../services/checkValidator");
var RequestParams = /** @class */ (function () {
    function RequestParams() {
    }
    RequestParams.signIn = function (req, res, next) {
        var _a = req.body, email = _a.email, password = _a.password;
        checkValidator_1.CheckValidator.checkerParams({ email: email, password: password });
        next();
    };
    RequestParams.signUp = function (req, res, next) {
        var _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, nickName = _a.nickName;
        checkValidator_1.CheckValidator.checkerParams({ email: email, password: password, confirmPassword: confirmPassword, nickName: nickName });
        checkValidator_1.CheckValidator.comparePassword({ password: password, confirmPassword: confirmPassword });
        next();
    };
    RequestParams.updatePassword = function (req, res, next) {
        var _a = req.body, password = _a.password, confirmPassword = _a.confirmPassword;
        checkValidator_1.CheckValidator.checkerParams({ password: password, confirmPassword: confirmPassword });
        checkValidator_1.CheckValidator.comparePassword({ password: password, confirmPassword: confirmPassword });
        next();
    };
    RequestParams.patchUpdateProfile = function (req, res, next) {
        var _a = req.body, nickName = _a.nickName, sex = _a.sex, avatar = _a.avatar;
        checkValidator_1.CheckValidator.checkerParams({ nickName: nickName, sex: sex });
        next();
    };
    RequestParams.postCreatePost = function (req, res, next) {
        var _a = req.body, content = _a.content, imgUrl = _a.imgUrl;
        checkValidator_1.CheckValidator.checkerParams({ content: content, imgUrl: imgUrl });
        next();
    };
    RequestParams.postCreateComment = function (req, res, next) {
        var comment = req.body.comment;
        checkValidator_1.CheckValidator.checkerParams({ comment: comment });
        next();
    };
    return RequestParams;
}());
exports.default = RequestParams;
