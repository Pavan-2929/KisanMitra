import {
  completeUserProfile,
  getUser,
  getUsers,
  login,
  logout,
  magiclinkCallbackRegistrationController,
  magiclinkRegistrationController,
  register,
  updateUser,
} from "../controllers/user.controller.js";
import express from "express";
import passport from "passport";
import User from "../models/user.model.js";
import { isLoggedIn } from "../middlewares/userAuth.js";
import upload from "../config/multerConfig.js";

const router = express.Router();
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const profileUrl = req.file ? req.file.path : "";
  try {
    const user = new User({ email, password, name, profileUrl });
    console.log(user);
    await user.save();
    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ message: "User registered", user });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.json({ message: "Authenticated", user: req.user });
  }
);

router.post("/magiclink", magiclinkRegistrationController);

router.get("/magiclink/callback", magiclinkCallbackRegistrationController);

router.get("/hii", async (req, res) => {
  return res.status(200).json({ success: true, message: req.user });
});
router.get("/me", isLoggedIn, (req, res) => {
  // console.log("🔹 Checking session:", req.session);
  // console.log("🔹 Checking user:", req.user);
  // console.log("🔹 Authenticated:", req.isAuthenticated());
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }
  return res.status(200).json({
    success: true,
    user: {
      _id: req.user._id,
      email: req.user.email,
      fullName: req.user.fullName,
      profile: req.user.profile,
    },
  });
});

router.post("/register", register);

router.post("/complete-user-profile", completeUserProfile);
router.post("/login", login);
router.post("/logout", logout);
router.get("/get-user/:id", getUser);
router.get("/get-all-users", getUsers);
router.put("/update-user/:id", upload.array("files", 1), updateUser);

export default router;
