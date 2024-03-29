import express from "express";
import UsersController from "../controllers/userController";
import RequestParams from "../middleware/requestParams";
import Auth from "../middleware/auth";
import { ErrorHandle } from "../services/errorHandle/errorHandle";
var router = express.Router();

router.get(
  "/profile/:id",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(UsersController.getProfile)
);
router.patch(
  "/profile",
  Auth.checkToken,
  RequestParams.patchUpdateProfile,
  ErrorHandle.handleErrorAsync(UsersController.patchUpdateProfile)
);
router.patch(
  "/update-password",
  Auth.checkToken,
  RequestParams.updatePassword,
  ErrorHandle.handleErrorAsync(UsersController.patchUpdatePassword)
);
router.post(
  "/sign-in",
  RequestParams.signIn,
  ErrorHandle.handleErrorAsync(UsersController.postSignIn)
);
router.post(
  "/sign-up",
  RequestParams.signUp,
  ErrorHandle.handleErrorAsync(UsersController.postSignUp)
);
router.get(
  "/check-is-user",
  Auth.checkToken,
  ErrorHandle.handleErrorAsync(UsersController.getCheckIsUser));
export default router;
