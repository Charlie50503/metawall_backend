import express from "express";
var router = express.Router();
import { PostsController } from "../controllers/postController"
/* GET users listing. */
router.get("/all-post", PostsController.getAllPost);

export default router;
