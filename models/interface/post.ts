import { Types } from "mongoose";
export interface PostModelDto {
  creator: Types.ObjectId;
  content: string;
  imgURL: string;
  comments: Array<Types.ObjectId>;
  likes: Array<Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
