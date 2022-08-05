import express from "express";
var router = express.Router();
import Auth from "../middleware/auth";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import LikeController from "../controllers/likeController";

router.get("/person-post/:userId", Auth.checkToken, ErrorHandle.handleErrorAsync(LikeController.getUserLikeList));
router.post(
  "/:postId",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(LikeController.postAddLikeOfPost)
);
router.delete(
  "/:postId",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(LikeController.deleteDeleteLikeOfPost)
);



export default router;
