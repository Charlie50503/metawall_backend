import express from "express";
var router = express.Router();
import PostsController from "../controllers/postController";
import { RequestParams } from "../middleware";
import Auth from "../middleware/auth";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
/* GET users listing. */
router.get("/all-post", Auth.checkToken, ErrorHandle.handleErrorAsync(PostsController.getAllPost));
router.get(
  "/person-post",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(PostsController.getPersonPost)
);
router.post(
  "/create-post",
  Auth.checkToken,
  RequestParams.postCreatePost,
  ErrorHandle.handleErrorAsync(PostsController.postCreatePost)
);
router.delete(
  "/delete-post/:postId",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(PostsController.deleteDeletePost)
);

export default router;
