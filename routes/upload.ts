import express from "express";
var router = express.Router();
import { Image } from "../middleware/image"
import UploadController from "../controllers/uploadController";
import Auth from "../middleware/auth";
import { ErrorHandle } from "../services/errorHandle/errorHandle";

router.post(
  "/",
  ErrorHandle.handleErrorAsync(Image.uploadOneImg),
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(UploadController.image)
);

export default router;