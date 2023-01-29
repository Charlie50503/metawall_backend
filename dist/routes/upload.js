"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var image_1 = require("../middleware/image");
var uploadController_1 = __importDefault(require("../controllers/uploadController"));
var auth_1 = __importDefault(require("../middleware/auth"));
var errorHandle_1 = require("../services/errorHandle/errorHandle");
router.post("/", errorHandle_1.ErrorHandle.handleErrorAsync(image_1.Image.uploadOneImg), auth_1.default.checkToken, errorHandle_1.ErrorHandle.handleErrorAsync(uploadController_1.default.image));
exports.default = router;
