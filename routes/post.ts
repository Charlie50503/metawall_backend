import express from "express";
var router = express.Router();
import PostsController from "../controllers/postController";
import RequestParams from "../middleware/requestParams";
import Auth from "../middleware/auth";
import { ErrorHandle } from "../services/errorHandle/errorHandle";

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

router.get(
  "/:postId",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(PostsController.getOnePostAndComment)
);
router.get(
  "/",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(PostsController.getSearchPost)
);


export default router;
