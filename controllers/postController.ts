import express from "express";
import Post from "../models/postModel";
import { successHandle } from "../services/successHandle";

class PostsController {
  public async getAllPost(req: express.Request, res: express.Response) {
    const allPostData = await Post.find().populate({
      path: "user",
      select: "name avatar",
    });
    successHandle(req, res, allPostData);
  }
}

export default new PostsController();
