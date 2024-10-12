import express from "express";
import {
    deleteUserController,
  getUsersController,
  loginController,
  registerController,
    resetPasswordController,
  updatePasswordController,
  updateUserController,
} from "../controller/userController.js";
import { authToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/getUsers", getUsersController);

router.put("/update", authToken, updateUserController);

router.post("/resetPassword", authToken, resetPasswordController);

router.post("/updatePassword", authToken, updatePasswordController);

router.delete("/delete/:id", authToken, deleteUserController)

export default router;
