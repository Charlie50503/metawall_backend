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
var postCollection_1 = require("./../resources/postCollection");
var jwt_1 = require("../services/jwt");
var successHandle_1 = require("../services/successHandle");
var errorHandle_1 = require("../services/errorHandle/errorHandle");
var PostsController = /** @class */ (function () {
    function PostsController() {
    }
    PostsController.prototype.getAllPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sort, sortKeyword, allPostData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sort = req.query.sort;
                        sortKeyword = decodeURI(sort) === "1" ? 1 : -1;
                        return [4 /*yield*/, postCollection_1.PostCollectionSelect.findAllPostList(sortKeyword)];
                    case 1:
                        allPostData = _a.sent();
                        (0, successHandle_1.successHandle)(req, res, allPostData);
                        return [2 /*return*/];
                }
            });
        });
    };
    PostsController.prototype.getAllPersonPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, sort, sortKeyword, _allPostData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params["userId"];
                        sort = req.query.sort;
                        if (!sort) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒有找到檢索條件", next))];
                        }
                        sortKeyword = decodeURI(sort) === "1" ? 1 : -1;
                        return [4 /*yield*/, postCollection_1.PostCollectionSelect.findPersonalPostList(userId, sortKeyword)];
                    case 1:
                        _allPostData = _a.sent();
                        (0, successHandle_1.successHandle)(req, res, _allPostData);
                        return [2 /*return*/];
                }
            });
        });
    };
    PostsController.prototype.getSearchPersonPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, q, sort, keyword, sortKeyword, regex, _allPostData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = req.params["userId"];
                        _a = req.query, q = _a.q, sort = _a.sort;
                        if (!q || !sort) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒有找到檢索條件", next))];
                        }
                        keyword = decodeURI(q);
                        sortKeyword = decodeURI(sort) === "1" ? 1 : -1;
                        regex = new RegExp(keyword);
                        return [4 /*yield*/, postCollection_1.PostCollectionSelect.searchPersonalPostList(userId, regex, sortKeyword)];
                    case 1:
                        _allPostData = _b.sent();
                        (0, successHandle_1.successHandle)(req, res, _allPostData);
                        return [2 /*return*/];
                }
            });
        });
    };
    PostsController.prototype.postCreatePost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, content, imgUrl, _result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, jwt_1.JWT.decodeTokenGetId(req, res, next)];
                    case 1:
                        userId = (_b.sent());
                        _a = req.body, content = _a.content, imgUrl = _a.imgUrl;
                        return [4 /*yield*/, postCollection_1.PostCollectionInsert.createPost(userId, content, imgUrl)];
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
    PostsController.prototype.deleteDeletePost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, userId, _isPostExist, _result, error_1;
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
                        return [4 /*yield*/, postCollection_1.PostCollectionSelect.findOnePost(postId).catch(function (error) {
                                return next(errorHandle_1.ErrorHandle.appError("400", "沒找到可刪除貼文", next));
                            })];
                    case 2:
                        _isPostExist = _a.sent();
                        if (!_isPostExist) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒找到可刪除貼文", next))];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, postCollection_1.PostCollectionUpdate.deletePost(postId, userId)];
                    case 4:
                        _result = _a.sent();
                        if (!_result) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "刪除失敗", next))];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        if ((error_1 === null || error_1 === void 0 ? void 0 : error_1.code) === 11000) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "刪除失敗", next))];
                        }
                        return [3 /*break*/, 6];
                    case 6:
                        (0, successHandle_1.successHandle)(req, res, {
                            message: "刪除成功",
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PostsController.prototype.getOnePostAndComment = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, _postData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postId = req.params["postId"];
                        if (!postId) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒找到 postId", next))];
                        }
                        return [4 /*yield*/, postCollection_1.PostCollectionSelect.findOnePostWithFullData(postId).catch(function (error) {
                                return next(errorHandle_1.ErrorHandle.appError("400", "沒有找到貼文", next));
                            })];
                    case 1:
                        _postData = _a.sent();
                        if (!_postData) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒有找到貼文", next))];
                        }
                        (0, successHandle_1.successHandle)(req, res, [_postData]);
                        return [2 /*return*/];
                }
            });
        });
    };
    PostsController.prototype.getSearchPost = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, q, sort, keyword, sortKeyword, regex, _searchResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, q = _a.q, sort = _a.sort;
                        if (!q || !sort) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒有找到檢索條件", next))];
                        }
                        keyword = decodeURI(q);
                        sortKeyword = decodeURI(sort) === "1" ? 1 : -1;
                        regex = new RegExp(keyword);
                        return [4 /*yield*/, postCollection_1.PostCollectionSelect.searchPostList(regex, sortKeyword)];
                    case 1:
                        _searchResult = _b.sent();
                        if (!_searchResult) {
                            return [2 /*return*/, next(errorHandle_1.ErrorHandle.appError("400", "沒找到內容", next))];
                        }
                        (0, successHandle_1.successHandle)(req, res, _searchResult);
                        return [2 /*return*/];
                }
            });
        });
    };
    return PostsController;
}());
exports.default = new PostsController();
