"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var followController_1 = __importDefault(require("../controllers/followController"));
var auth_1 = __importDefault(require("../middleware/auth"));
var errorHandle_1 = require("../services/errorHandle/errorHandle");
var router = express_1.default.Router();
router.get("/:targetId", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(followController_1.default.getFollowing));
router.post("/:targetId", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(followController_1.default.postAddFollowing));
router.delete("/:targetId", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(followController_1.default.deleteFollowingTarget));
exports.default = router;
