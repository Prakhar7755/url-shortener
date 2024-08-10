import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import { setUser, getUser } from "../utils/auth.js";

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const details = await User.create({ name, email, password });

    if (!details) {
      return res.status(500).json({ error: "user creation failed" });
    }

    console.log("User created", details.name);
    return res.redirect("/");
  } catch (error) {
    console.error("User creation failed", error);
    res.status(500).json({ error: "user creation failed" });
    return false;
  }
}
async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "Missing required fields" });

    const user = await User.findOne({ email, password });

    if (!user) return res.render("login", { error: "invalid email or password" });

    // const sessionId = uuidv4();
    const token = setUser(/* sessionId, */ user);
    res.cookie("uid", token);

    return res.redirect("/");
  } catch (error) {
    console.error("User login failed", error);
    res.status(500).json({ error: "user login failed" });
    return false;
  }
}

export { handleUserSignup, handleUserLogin };
