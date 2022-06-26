import { Types } from "mongoose";
export interface FollowModelDto {
  user: Types.ObjectId;
  following: Array<Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
