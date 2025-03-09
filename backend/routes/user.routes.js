import { getUser, getUsers, login, logout, register, updateUser } from "../controllers/user.controller.js";
import express from express;

const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/get-user/:id").get(getUser);
router.route("/get-all-users").get(getUsers);
router.route('/update-user/:id').put(updateUser);

export default router;