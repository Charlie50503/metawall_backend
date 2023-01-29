"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var postController_1 = __importDefault(require("../controllers/postController"));
var requestParams_1 = __importDefault(require("../middleware/requestParams"));
var auth_1 = __importDefault(require("../middleware/auth"));
var errorHandle_1 = require("../services/errorHandle/errorHandle");
router.get("/all-post", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(postController_1.default.getAllPost));
router.get("/person-post/:userId", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(postController_1.default.getAllPersonPost));
router.get("/search-person-post/:userId", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(postController_1.default.getSearchPersonPost));
router.post("/create-post", auth_1.default.checkToken, requestParams_1.default.postCreatePost, errorHandle_1.ErrorHandle.handleErrorAsync(postController_1.default.postCreatePost));
router.delete("/delete-post/:postId", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(postController_1.default.deleteDeletePost));
router.get("/:postId", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(postController_1.default.getOnePostAndComment));
router.get("/", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(postController_1.default.getSearchPost));
exports.default = router;
