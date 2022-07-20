import express from "express";
import followController from "../controllers/followController";
import Auth from "../middleware/auth";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
var router = express.Router();

router.get(
  "/:targetId",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(followController.getFollowing)
);
router.post(
  "/:targetId",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(followController.postAddFollowing)
);
router.delete(
  "/:targetId",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(followController.deleteFollowingTarget)
);

export default router;
