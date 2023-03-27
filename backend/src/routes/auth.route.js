import jsonwebtoken from "jsonwebtoken";
import { Router } from "express";
import { login, logout } from "../controllers/auth.controller";
const router = Router();
router.route("/login").post(login);
router.route("/logout").get(logout);
export default router;
