import { Router } from "express";
import URL from "../models/url.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const allUrls = await URL.find();
  res.render("home", { urls: allUrls });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});
export default router;
