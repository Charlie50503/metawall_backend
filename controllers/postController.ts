import express from "express";
import Post from "../models/postModel";
import { JWT } from "../services/jwt";
import { successHandle } from "../services/successHandle";
import mongoose from "mongoose";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import { PostModelDto } from "../models/interface/post";

interface postCreatePostIF {
  content: string;
  imgURL: string;
}
class PostsController {
  public async getAllPost(req: express.Request, res: express.Response) {
    const allPostData = await Post.find({
      isDeleted: false,
    })
      .populate({
        path: "creator",
        select: "nickName avatar",
      })
      .sort({ createdAt: -1 });
    successHandle(req, res, allPostData);
  }
  public async getPersonPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;
    const allPostData = await Post.find({
      creator: userId,
      isDeleted: false,
    })
      .populate({
        path: "creator",
        select: "nickName avatar",
      })
      .sort({ createdAt: -1 });
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
