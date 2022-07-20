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

  public async postCreatePost(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId = await JWT.decodeTokenGetId(req, res, next) as Types.ObjectId
    const { content, imgURL } = req.body as postCreatePostIF

    const _result = await Post.create({
      creator: userId,
      content,
      imgURL
    })

    successHandle(req, res, _result)
  }
}

export default new PostsController();
