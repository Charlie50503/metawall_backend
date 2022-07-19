import express from "express";
import UsersController from "../controllers/userController";
import { RequestParams } from "../middleware";
import Auth from "../middleware/auth";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
var router = express.Router();

/* GET users listing. */
router.get("/profile/:id", Auth.checkToken,ErrorHandle.handleErrorAsync(UsersController.getProfile));
router.patch("/profile", Auth.checkToken,RequestParams.patchUpdateProfile,ErrorHandle.handleErrorAsync(UsersController.patchUpdateProfile));
router.post("/sign-in",RequestParams.signIn, ErrorHandle.handleErrorAsync(UsersController.postSignIn));
router.post("/sign-up",RequestParams.signUp, ErrorHandle.handleErrorAsync(UsersController.postSignUp));
router.get("/check-is-user",Auth.checkToken,(req:express.Request,res: express.Response )=>{
  res.status(200).json({
    message:"驗證成功"
  })
})
export default router;
