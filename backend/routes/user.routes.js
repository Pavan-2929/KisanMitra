import {
  getUser,
  getUsers,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/user.controller.js";
import express from "express";
import passport from "passport";
import User from "../models/user.model.js";
// import { uploadToCloudinary } from "../middlewares/cloudinary.js";

const router = express.Router();
// Signup
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const profileUrl = req.file ? req.file.path : "";
  try {
    const user = new User({ email, password, name, profileUrl });
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

router.post("/magiclink", async (req, res, next) => {
  passport.authenticate(
    "magiclink",
    { action: "requestToken", passReqToCallback: true },
    async (err, user, info) => {
      console.log("Passport callback executed", err, user, info);

      if (err) {
        console.error("Error in authentication:", err);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      console.log("User Info:", user, info);

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Failed to send magic link" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Magic link sent successfully", user });
    }
  )(req, res, next);

  // console.log("req.res.json", req.res)
  // return res.status(200).json({ success: true, message: "Magic link sent successfully" });
});

router.get("/magiclink/callback", (req, res, next) => {
  passport.authenticate("magiclink", (err, user, info) => {
    // console.log("user : " + user)

    if (!user?.success) {
      return res.status(400).json({ error: "Invalid or expired magic link" });
    }

    // console.log("User authenticated successfully:", user);
    req.login(user.user, (err) => {
      if (err) {
        console.error("Session login error:", err);
        return res.status(500).json({ error: "Login failed" });
      }
      return res.redirect("/api/auth/hii"); // Redirect to success page
    });
  })(req, res, next);
});

router.get("/hii", async (req, res) => {
  console.log("josef", req.user);
  return res.status(200).json({ success: true, message: req.user });
});
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/get-user/:id").get(getUser);
router.route("/get-all-users").get(getUsers);
router.route("/update-user/:id").put(updateUser);

export default router;
