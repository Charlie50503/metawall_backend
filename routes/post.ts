import express from "express";
var router = express.Router();
import { PostsController } from "../controllers/postController"
import { ErrorHandle } from "../services/errorHandle/errorHandle"
/* GET users listing. */
router.get("/all-post", ErrorHandle.handleErrorAsync(PostsController.getAllPost));

export default router;
