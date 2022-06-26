import { Schema, Types } from 'mongoose';
export interface Post {
  creator: Types.ObjectId,
  content: string,
  imgURL: string,
  comments: Array<Types.ObjectId>,
  isDelete: boolean,
  likes: Array<Types.ObjectId>,
  createdAt: Date,
  updatedAt: Date

}

