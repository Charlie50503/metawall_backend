"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({
    path: "setting.env",
});
var _a = process.env, DATABASE = _a.DATABASE, DATABASE_PASSWORD = _a.DATABASE_PASSWORD;
var url = DATABASE === null || DATABASE === void 0 ? void 0 : DATABASE.replace("<password>", DATABASE_PASSWORD);
mongoose_1.default.connect(url).then(function () {
    console.log("database connected.");
});
