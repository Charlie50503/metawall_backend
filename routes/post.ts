import express from "express";
var router = express.Router();
import PostsController from "../controllers/postController";
import { RequestParams } from "../middleware";
import Auth from "../middleware/auth";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
/* GET users listing. */
router.get("/all-post", Auth.checkToken, ErrorHandle.handleErrorAsync(PostsController.getAllPost));
router.post("/create-post", Auth.checkToken, RequestParams.postCreatePost, ErrorHandle.handleErrorAsync(PostsController.postCreatePost));

export default router;
