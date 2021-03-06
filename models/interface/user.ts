export interface UserModelDto extends Document {
  nickName: string;
  sex: string;
  avatar: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
