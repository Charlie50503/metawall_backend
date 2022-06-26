import { Types } from "mongoose";
export interface CommentModelDto {
    creator: Types.ObjectId;
    postId: Types.ObjectId;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
