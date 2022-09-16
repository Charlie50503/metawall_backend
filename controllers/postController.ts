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
    const { sort } = req.query as { [key: string]: string };
    const sortKeyword: 1 | -1 = decodeURI(sort) === "1" ? 1 : -1

    const allPostData = await Post.find({
      isDeleted: false,
    })
      .populate({
        path: "creator",
        select: "nickName avatar sex",
        match: { isDeleted: { $eq: false } }
      })
      .populate({
        path: "comments",
        select: "creator comment",
        match: { isDeleted: { $eq: false } },
        populate: {
          path: "creator",
          select: "nickName avatar sex"
        }
      })
      .select("+createdAt")
      .sort({ createdAt: sortKeyword });
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
        match: { isDeleted: { $eq: false } }
      })
      .populate({
        path: "comments",
        select: "creator comment",
        match: { isDeleted: { $eq: false } }
      })
      .sort({ createdAt: -1 });
    successHandle(req, res, allPostData);
  }

  public async postCreatePost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;
    const { content, imgURL } = req.body as postCreatePostIF;

    const _result = await Post.create({
      creator: userId,
      content,
      imgURL,
    });

    if (!_result) {
      return next(ErrorHandle.appError("400", "更新失敗", next));
    }

    successHandle(req, res, _result);
  }
  public async deleteDeletePost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { postId } = req.params;
    if (!postId) {
      return next(ErrorHandle.appError("400", "沒找到 postId", next));
    }

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const _isPostExist = await Post.findOne({ _id: postId, isDeleted: false }).catch(error => {
      return next(ErrorHandle.appError("400", "沒找到可刪除貼文", next));
    })

    if (!_isPostExist) {
      return next(ErrorHandle.appError("400", "沒找到可刪除貼文", next));
    }

    try {
      const _result: PostModelDto = await Post.findOneAndUpdate(
        {
          _id: postId,
          creator: userId,
          isDeleted: false,
        },
        { isDeleted: true },
        { upsert: true, returnOriginal: false, runValidators: true }
      );

      if (!_result) {
        return next(ErrorHandle.appError("400", "刪除失敗", next));
      }
    } catch (error: mongoose.Error | any) {
      if (error?.code === 11000) {
        return next(ErrorHandle.appError("400", "刪除失敗", next));
      }
    }

    successHandle(req, res, {
      message: "刪除成功",
    });
  }

  public async getOnePostAndComment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const postId = req.params["postId"] as unknown as mongoose.Types.ObjectId;

    if (!postId) {
      return next(ErrorHandle.appError("400", "沒找到 postId", next));
    }

    const _postData = await Post.findOne({ _id: postId, isDeleted: false })
      .populate({
        path: "creator",
        select: "nickName avatar sex",
        match: { isDeleted: { $eq: false } }
      })
      .populate({
        path: "comments",
        select: "creator comment",
        match: { isDeleted: { $eq: false } },
        populate: {
          path: "creator",
          select: "nickName avatar sex"
        }
      })
      .select("+createdAt")
      .catch((error) => {
        return next(ErrorHandle.appError("400", "沒有找到貼文", next));
      });

    if (!_postData) {
      return next(ErrorHandle.appError("400", "沒有找到貼文", next));
    }
    successHandle(req, res, _postData);
  }

  public async getSearchPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { q, sort } = req.query as { [key: string]: string };

    if (!q || !sort) {
      return next(ErrorHandle.appError("400", "沒有找到檢索條件", next));
    }

    const keyword: string = decodeURI(q);
    const sortKeyword: 1 | -1 = decodeURI(sort) === "1" ? 1 : -1

    const regex = new RegExp(keyword);
    const _searchResult = await Post.find({
      content:{ $regex:regex },
      isDeleted: false,
    })
      .populate({
        path: "creator",
        select: "nickName avatar sex",
        match: { isDeleted: { $eq: false } }
      })
      .populate({
        path: "comments",
        select: "creator comment",
        match: { isDeleted: { $eq: false } },
        populate: {
          path: "creator",
          select: "nickName avatar sex"
        }
      })
      .select("+createdAt")
      .sort({ createdAt: sortKeyword });

    // console.log(_searchResult);

    if (!_searchResult) {
      return next(ErrorHandle.appError("400", "沒找到內容", next));
    }

    successHandle(req, res, _searchResult);

  }
}

export default new PostsController();
