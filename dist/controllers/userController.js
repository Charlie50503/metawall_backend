"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_1 = require("./../services/jwt");
var userModel_1 = __importDefault(require("../models/userModel"));
var successHandle_1 = require("../services/successHandle");
var errorHandle_1 = require("../services/errorHandle/errorHandle");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.getProfile = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        if (!id) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒有找到對象ID", next))];
                        }
                        return [4 /*yield*/, userModel_1.default.findById(id)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒有找到對象USER", next))];
                        }
                        return [2 /*return*/, (0, successHandle_1.successHandle)(req, res, result)];
                }
            });
        });
    };
    UsersController.prototype.patchUpdateProfile = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nickName, sex, avatar, userId, updateData, _result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, nickName = _a.nickName, sex = _a.sex, avatar = _a.avatar;
                        return [4 /*yield*/, jwt_1.JWT.decodeTokenGetId(req, res, next)];
                    case 1:
                        userId = _b.sent();
                        console.log("userId", userId);
                        updateData = {
                            nickName: nickName,
                            sex: sex,
                        };
                        if ((avatar === null || avatar === void 0 ? void 0 : avatar.length) !== 0) {
                            updateData["avatar"] = avatar;
                        }
                        return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(userId, updateData, {
                                upsert: true,
                                returnOriginal: false,
                                runValidators: true,
                            })];
                    case 2:
                        _result = _b.sent();
                        if (!_result) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "更新失敗", next))];
                        }
                        (0, successHandle_1.successHandle)(req, res, _result);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.patchUpdatePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, confirmPassword, bcryptPassword, userId, _result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, password = _a.password, confirmPassword = _a.confirmPassword;
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, 12)];
                    case 1:
                        bcryptPassword = _b.sent();
                        return [4 /*yield*/, jwt_1.JWT.decodeTokenGetId(req, res, next)];
                    case 2:
                        userId = _b.sent();
                        return [4 /*yield*/, userModel_1.default.findByIdAndUpdate(userId, {
                                password: bcryptPassword,
                            })];
                    case 3:
                        _result = _b.sent();
                        if (!_result) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "密碼更新失敗", next))];
                        }
                        (0, successHandle_1.successHandle)(req, res, {
                            message: "密碼更新成功",
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.postSignUp = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, originPassword, nickName, password, _result, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, originPassword = _a.password, nickName = _a.nickName;
                        return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                    case 1:
                        if (_b.sent()) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "此 Email 已被註冊", next))];
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(originPassword, 12)];
                    case 2:
                        password = _b.sent();
                        return [4 /*yield*/, userModel_1.default.create({
                                nickName: nickName,
                                email: email,
                                password: password,
                            })];
                    case 3:
                        _result = _b.sent();
                        if (!_result) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "不明原因錯誤", next))];
                        }
                        return [4 /*yield*/, jwt_1.JWT.generateJwtToken(_result.id)];
                    case 4:
                        token = _b.sent();
                        (0, successHandle_1.successHandle)(req, res, {
                            token: token,
                            nickName: _result.nickName,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.postSignIn = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, auth, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, userModel_1.default.findOne({ email: email }).select("+password")];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "帳號或密碼錯誤", next))];
                        }
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                    case 2:
                        auth = _b.sent();
                        if (!auth) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "帳號或密碼錯誤", next))];
                        }
                        return [4 /*yield*/, jwt_1.JWT.generateJwtToken(user.id)];
                    case 3:
                        token = _b.sent();
                        (0, successHandle_1.successHandle)(req, res, {
                            token: token,
                            nickName: user.nickName,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return UsersController;
}());
exports.default = new UsersController();
