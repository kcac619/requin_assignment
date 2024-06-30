import express from "express";
import {
  dashboardController,
  loginUserController,
  registerUserController,
} from "../controllers/userController.js";
import protect from "../middleware/authenticate.js";
const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/dashboard", protect, dashboardController);

export default router;
