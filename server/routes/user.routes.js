import { Router } from "express";
const router = Router();
import UserController from "../controllers/user.controller.js";
import { body } from "express-validator";

router.post(
	"/registration",
	body("email").isEmail(),
	body("password").isLength({ min: 3, max: 32 }),
	UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/verify/:link", UserController.verify);
router.get("/refresh", UserController.refresh);
router.get("/users", UserController.getUsers);

export default router;
