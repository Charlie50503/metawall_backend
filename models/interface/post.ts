import { Types } from "mongoose";
export interface PostModelDto {
  creator: Types.ObjectId;
  content: string;
  imgUrl: string;
  comments: Array<Types.ObjectId>;
  likes: Array<Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
