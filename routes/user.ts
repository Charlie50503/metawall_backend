import express from "express";
import { UsersController } from "../controllers/userController";
var router = express.Router();

/* GET users listing. */
router.get("/profile", UsersController.getProfile);

export default router;
