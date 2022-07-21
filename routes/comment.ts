import express from "express";
import commentController from "../controllers/commentController";
import Auth from "../middleware/auth";
import RequestParams from "../middleware/requestParams";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
var router = express.Router();

router.post(
  "/create/:postId",
  Auth.checkToken,
  RequestParams.postCreateComment,
  ErrorHandle.handleErrorAsync(commentController.postCreateComment)
);
router.delete(
  "/delete/:commentId",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(commentController.deleteDeleteComment)
);

export default router;
