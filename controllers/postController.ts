import { PostCollectionInsert, PostCollectionSelect, PostCollectionUpdate } from './../resources/postCollection';
import express from "express";
import { JWT } from "../services/jwt";
import { successHandle } from "../services/successHandle";
import mongoose from "mongoose";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
import { PostModelDto } from "../models/interface/post";

interface postCreatePostIF {
  content: string;
  imgUrl: string;
}
class PostsController {
  public async getAllPost(req: express.Request, res: express.Response) {
    const { sort } = req.query as { [key: string]: string };
    const sortKeyword: 1 | -1 = decodeURI(sort) === "1" ? 1 : -1

    const allPostData = await PostCollectionSelect.findAllPostList(sortKeyword)

    successHandle(req, res, allPostData);
  }
  public async getAllPersonPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = req.params["userId"] as unknown as mongoose.Types.ObjectId;
    
    const { sort } = req.query as { [key: string]: string };

    if (!sort) {
      return next(ErrorHandle.appError("400", "沒有找到檢索條件", next));
    }

    const sortKeyword: 1 | -1 = decodeURI(sort) === "1" ? 1 : -1

    const _allPostData = await PostCollectionSelect.findPersonalPostList(userId, sortKeyword)
    successHandle(req, res, _allPostData);
  }

  public async getSearchPersonPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = req.params["userId"] as unknown as mongoose.Types.ObjectId;
    
    const { q, sort } = req.query as { [key: string]: string };

    if (!q || !sort) {
      return next(ErrorHandle.appError("400", "沒有找到檢索條件", next));
    }

    const keyword: string = decodeURI(q);
    const sortKeyword: 1 | -1 = decodeURI(sort) === "1" ? 1 : -1

    const regex = new RegExp(keyword);

    const _allPostData = await PostCollectionSelect.searchPersonalPostList(userId, regex, sortKeyword)
    successHandle(req, res, _allPostData);
  }

  public async postCreatePost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;
    const { content, imgUrl } = req.body as postCreatePostIF;

    const _result = await PostCollectionInsert.createPost(userId, content, imgUrl)

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
    const postId = req.params["postId"] as unknown as mongoose.Types.ObjectId;
    if (!postId) {
      return next(ErrorHandle.appError("400", "沒找到 postId", next));
    }

    const userId = (await JWT.decodeTokenGetId(req, res, next)) as mongoose.Types.ObjectId;

    const _isPostExist = await PostCollectionSelect.findOnePost(postId).catch(error => {
      return next(ErrorHandle.appError("400", "沒找到可刪除貼文", next));
    })

    if (!_isPostExist) {
      return next(ErrorHandle.appError("400", "沒找到可刪除貼文", next));
    }

    try {
      const _result: PostModelDto = await PostCollectionUpdate.deletePost(postId, userId);

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

    const _postData = await PostCollectionSelect.findOnePostWithFullData(postId).catch((error) => {
      return next(ErrorHandle.appError("400", "沒有找到貼文", next));
    });

    if (!_postData) {
      return next(ErrorHandle.appError("400", "沒有找到貼文", next));
    }
    successHandle(req, res, [_postData]);
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
    const _searchResult = await PostCollectionSelect.searchPostList(regex, sortKeyword)

    if (!_searchResult) {
      return next(ErrorHandle.appError("400", "沒找到內容", next));
    }

    successHandle(req, res, _searchResult);

  }
}

export default new PostsController();
