import { Router } from "express";
import URL from "../models/url.model.js";
import { restrictTo } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({ createBy: req.user._id });
  res.render("home", { urls: allUrls });
});

router.get("/", restrictTo(["NORMAL"]), async (req, res) => {
  // if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({ createBy: req.user._id });
  res.render("home", { urls: allUrls });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});
export default router;
