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
Object.defineProperty(exports, "__esModule", { value: true });
var followCollection_1 = require("./../resources/followCollection");
var userCollection_1 = require("./../resources/userCollection");
var followCollection_2 = require("../resources/followCollection");
var errorHandle_1 = require("../services/errorHandle/errorHandle");
var jwt_1 = require("../services/jwt");
var successHandle_1 = require("../services/successHandle");
var FollowController = /** @class */ (function () {
    function FollowController() {
    }
    FollowController.prototype.getFollowing = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var targetId, _result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetId = req.params["targetId"];
                        if (!targetId) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒找到 targetId", next))];
                        }
                        return [4 /*yield*/, followCollection_2.FollowCollectionSelect.findFollowList(targetId).catch(function (error) {
                                return next(errorHandle_1.ErrorHandle.appError("400", "沒有找到內容", next));
                            })];
                    case 1:
                        _result = _a.sent();
                        console.log(_result);
                        (0, successHandle_1.successHandle)(req, res, _result);
                        return [2 /*return*/];
                }
            });
        });
    };
    FollowController.prototype.postAddFollowing = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var targetId, isUserExist, userId, isUserDataExist, _isFollowing, _updateResult, _result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetId = req.params["targetId"];
                        if (!targetId) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒找到 targetId", next))];
                        }
                        return [4 /*yield*/, userCollection_1.UserCollectionSelect.findUserById(targetId).catch(function (error) {
                                return next(errorHandle_1.ErrorHandle.appError("400", "不存在該USER", next));
                            })];
                    case 1:
                        isUserExist = _a.sent();
                        console.log("isUserExist", isUserExist);
                        if (!isUserExist) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "不存在該USER", next))];
                        }
                        return [4 /*yield*/, jwt_1.JWT.decodeTokenGetId(req, res, next)];
                    case 2:
                        userId = (_a.sent());
                        if (targetId === userId) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "不能追蹤自己", next))];
                        }
                        return [4 /*yield*/, followCollection_2.FollowCollectionSelect.findUserData(userId)];
                    case 3:
                        isUserDataExist = _a.sent();
                        if (!isUserDataExist) return [3 /*break*/, 6];
                        return [4 /*yield*/, followCollection_2.FollowCollectionSelect.findFollowingInUser(userId, targetId).catch(function (error) {
                                return next(errorHandle_1.ErrorHandle.appError("400", "不存在該USER", next));
                            })];
                    case 4:
                        _isFollowing = _a.sent();
                        if (_isFollowing) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "已追蹤了", next))];
                        }
                        return [4 /*yield*/, followCollection_1.FollowCollectionUpdate.addUserInFollow(userId, targetId).catch(function (error) {
                                return next(errorHandle_1.ErrorHandle.appError("400", "添加失敗", next));
                            })];
                    case 5:
                        _updateResult = _a.sent();
                        if ((_updateResult === null || _updateResult === void 0 ? void 0 : _updateResult.acknowledged) === false) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "添加失敗", next))];
                        }
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, followCollection_1.FollowCollectionInsert.createFollow(userId, targetId).catch(function (error) {
                            return next(errorHandle_1.ErrorHandle.appError("400", "新增失敗", next));
                        })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, followCollection_2.FollowCollectionSelect.findUserData(userId).catch(function (error) {
                            return next(errorHandle_1.ErrorHandle.appError("400", "沒找到對象USER", next));
                        })];
                    case 9:
                        _result = _a.sent();
                        console.log("_result", _result);
                        if (!_result) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒找到對象USER", next))];
                        }
                        console.log(_result);
                        (0, successHandle_1.successHandle)(req, res, _result);
                        return [2 /*return*/];
                }
            });
        });
    };
    FollowController.prototype.deleteFollowingTarget = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var targetId, isUserExist, userId, _findResult, following, targetIndex, _updateResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetId = req.params["targetId"];
                        if (!targetId) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒找到 targetId", next))];
                        }
                        return [4 /*yield*/, userCollection_1.UserCollectionSelect.findUserById(targetId).catch(function (error) {
                                return next(errorHandle_1.ErrorHandle.appError("400", "不存在該USER", next));
                            })];
                    case 1:
                        isUserExist = _a.sent();
                        if (!isUserExist) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "不存在該USER", next))];
                        }
                        return [4 /*yield*/, jwt_1.JWT.decodeTokenGetId(req, res, next)];
                    case 2:
                        userId = (_a.sent());
                        if (targetId === userId) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "不能刪除自己", next))];
                        }
                        return [4 /*yield*/, followCollection_2.FollowCollectionSelect.findFollowByUserId(userId).catch(function (error) {
                                return next(errorHandle_1.ErrorHandle.appError("400", "沒有找到資料", next));
                            })];
                    case 3:
                        _findResult = _a.sent();
                        if (!_findResult) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒有找到資料", next))];
                        }
                        following = _findResult.following;
                        if (!following) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "處理不正確", next))];
                        }
                        targetIndex = following.findIndex(function (follow) { return follow.user.equals(targetId); });
                        if (targetIndex === -1) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "已刪除該對象", next))];
                        }
                        following.splice(targetIndex);
                        return [4 /*yield*/, followCollection_1.FollowCollectionUpdate.sliceFollowTarget(userId, following)
                                .catch(function (error) {
                                return next(errorHandle_1.ErrorHandle.appError("400", "刪除失敗", next));
                            })];
                    case 4:
                        _updateResult = _a.sent();
                        console.log("_updateResult", _updateResult);
                        (0, successHandle_1.successHandle)(req, res, _updateResult);
                        return [2 /*return*/];
                }
            });
        });
    };
    return FollowController;
}());
exports.default = new FollowController();
