import express from "express";
import UsersController from "../controllers/userController";
import { RequestParams } from "../middleware";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
var router = express.Router();

/* GET users listing. */
router.get("/profile/:id", ErrorHandle.handleErrorAsync(UsersController.getProfile));
router.post("/sign-in",RequestParams.signIn, ErrorHandle.handleErrorAsync(UsersController.postSignIn));
router.post("/sign-up",RequestParams.signUp, ErrorHandle.handleErrorAsync(UsersController.postSignUp));

export default router;
