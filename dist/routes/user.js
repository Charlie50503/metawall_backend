"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controllers/userController"));
var requestParams_1 = __importDefault(require("../middleware/requestParams"));
var auth_1 = __importDefault(require("../middleware/auth"));
var errorHandle_1 = require("../services/errorHandle/errorHandle");
var router = express_1.default.Router();
router.get("/profile/:id", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(userController_1.default.getProfile));
router.patch("/profile", auth_1.default.checkToken, requestParams_1.default.patchUpdateProfile, errorHandle_1.ErrorHandle.handleErrorAsync(userController_1.default.patchUpdateProfile));
router.patch("/update-password", auth_1.default.checkToken, requestParams_1.default.updatePassword, errorHandle_1.ErrorHandle.handleErrorAsync(userController_1.default.patchUpdatePassword));
router.post("/sign-in", requestParams_1.default.signIn, errorHandle_1.ErrorHandle.handleErrorAsync(userController_1.default.postSignIn));
router.post("/sign-up", requestParams_1.default.signUp, errorHandle_1.ErrorHandle.handleErrorAsync(userController_1.default.postSignUp));
router.get("/check-is-user", auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(userController_1.default.getCheckIsUser));
exports.default = router;
