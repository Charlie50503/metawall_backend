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
var postModel_1 = __importDefault(require("../models/postModel"));
var errorHandle_1 = require("../services/errorHandle/errorHandle");
var jwt_1 = require("../services/jwt");
var successHandle_1 = require("../services/successHandle");
var LikeController = /** @class */ (function () {
    function LikeController() {
    }
    LikeController.prototype.getUserLikeList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _likeListResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params["userId"];
                        if (!userId) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒找到 userId", next))];
                        }
                        console.log("userId", userId);
                        return [4 /*yield*/, postModel_1.default.find({
                                likes: userId,
                                isDeleted: false
                            }).catch(function (error) {
                                return next(errorHandle_1.ErrorHandle.appError("400", "沒有找到內容", next));
                            })];
                    case 1:
                        _likeListResult = _a.sent();
                        console.log(_likeListResult);
                        (0, successHandle_1.successHandle)(req, res, _likeListResult);
                        return [2 /*return*/];
                }
            });
        });
    };
    LikeController.prototype.postAddLikeOfPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, userId, _isPostExist, query, updateDocument, _updateResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postId = req.params["postId"];
                        if (!postId) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒找到 postId", next))];
                        }
                        return [4 /*yield*/, jwt_1.JWT.decodeTokenGetId(req, res, next)];
                    case 1:
                        userId = (_a.sent());
                        return [4 /*yield*/, postModel_1.default.findOne({ _id: postId, isDeleted: false })];
                    case 2:
                        _isPostExist = _a.sent();
                        if (!_isPostExist) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "貼文不存在", next))];
                        }
                        query = { _id: postId, isDeleted: false };
                        updateDocument = {
                            $addToSet: { likes: userId },
                            upsert: true,
                            returnOriginal: false,
                            runValidators: true,
                        };
                        return [4 /*yield*/, postModel_1.default.updateOne(query, updateDocument)];
                    case 3:
                        _updateResult = _a.sent();
                        console.log("_updateResult", _updateResult);
                        if ((_updateResult === null || _updateResult === void 0 ? void 0 : _updateResult.acknowledged) === true && (_updateResult === null || _updateResult === void 0 ? void 0 : _updateResult.modifiedCount) === 0) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "已添加過like", next))];
                        }
                        if ((_updateResult === null || _updateResult === void 0 ? void 0 : _updateResult.acknowledged) === false) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "添加失敗", next))];
                        }
                        (0, successHandle_1.successHandle)(req, res, {
                            message: "新增成功"
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    LikeController.prototype.deleteDeleteLikeOfPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, userId, _isPostExist, query, updateDocument, _updateResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postId = req.params["postId"];
                        if (!postId) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒找到 postId", next))];
                        }
                        return [4 /*yield*/, jwt_1.JWT.decodeTokenGetId(req, res, next)];
                    case 1:
                        userId = (_a.sent());
                        return [4 /*yield*/, postModel_1.default.findOne({ _id: postId, isDeleted: false })];
                    case 2:
                        _isPostExist = _a.sent();
                        if (!_isPostExist) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "貼文不存在", next))];
                        }
                        query = { _id: postId, isDeleted: false };
                        updateDocument = {
                            $pull: { likes: userId },
                            upsert: true,
                            returnOriginal: false,
                            runValidators: true,
                        };
                        return [4 /*yield*/, postModel_1.default.updateOne(query, updateDocument)];
                    case 3:
                        _updateResult = _a.sent();
                        console.log(_updateResult);
                        if ((_updateResult === null || _updateResult === void 0 ? void 0 : _updateResult.acknowledged) === false) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "添加失敗", next))];
                        }
                        if ((_updateResult === null || _updateResult === void 0 ? void 0 : _updateResult.acknowledged) === true && (_updateResult === null || _updateResult === void 0 ? void 0 : _updateResult.modifiedCount) === 0) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "已刪除like", next))];
                        }
                        (0, successHandle_1.successHandle)(req, res, {
                            message: "刪除成功"
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return LikeController;
}());
exports.default = new LikeController();
