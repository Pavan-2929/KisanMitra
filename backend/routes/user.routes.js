
import { completeUserProfile, getUser, getUsers, login, logout, magiclinkCallbackRegistrationController, magiclinkRegistrationController, updateUser } from "../controllers/user.controller.js";
import express from "express";
import passport from "passport"
import User from "../models/user.model.js"

const router = express.Router();
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
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
  res.json({ message: "Authenticated", user: req.user });
});

router.post("/magiclink", magiclinkRegistrationController);

router.get("/magiclink/callback", magiclinkCallbackRegistrationController);

router.get('/hii', async (req, res) => { return res.status(200).json({ success: true, message: req.user }); })
router.post("/complete-user-profile", completeUserProfile)
router.post("/login", login);
router.post("/logout", logout);
router.get("/get-user/:id", getUser);
router.get("/get-all-users", getUsers);
router.put('/update-user/:id', updateUser);



export default router;
