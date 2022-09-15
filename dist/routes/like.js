"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var auth_1 = __importDefault(require("../middleware/auth"));
var errorHandle_1 = require("../services/errorHandle/errorHandle");
var likeController_1 = __importDefault(require("../controllers/likeController"));
router.get("/person-post/:userId", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(likeController_1.default.getUserLikeList));
router.post("/:postId", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(likeController_1.default.postAddLikeOfPost));
router.delete("/:postId", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(likeController_1.default.deleteDeleteLikeOfPost));
exports.default = router;
