import { Types } from "mongoose";
export interface FollowModelDto {
  user: Types.ObjectId;
  following: Array<{
    user:Types.ObjectId,
    createdAt: Date
  }>;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
