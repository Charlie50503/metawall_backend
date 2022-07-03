import express from "express";
import { UsersController } from "../controllers/userController";
import { ErrorHandle } from "../services/errorHandle/errorHandle"
var router = express.Router();

/* GET users listing. */
router.get("/profile/:id", ErrorHandle.handleErrorAsync(UsersController.getProfile));

export default router;
