"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var commentController_1 = __importDefault(require("../controllers/commentController"));
var auth_1 = __importDefault(require("../middleware/auth"));
var requestParams_1 = __importDefault(require("../middleware/requestParams"));
var errorHandle_1 = require("../services/errorHandle/errorHandle");
var router = express_1.default.Router();
router.post("/create/:postId", auth_1.default.checkToken, requestParams_1.default.postCreateComment, errorHandle_1.ErrorHandle.handleErrorAsync(commentController_1.default.postCreateComment));
router.delete("/delete/:commentId", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(commentController_1.default.deleteDeleteComment));
router.patch("/edit", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(commentController_1.default.patchEditComment));
exports.default = router;
