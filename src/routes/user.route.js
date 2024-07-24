import { Router } from "express";
import { handleUserSignup, handleUserLogin } from "../controllers/user.controller.js";

const router = Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);

export default router;
