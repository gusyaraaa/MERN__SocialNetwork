import UserService from "../services/user.service.js";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiError.js";

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
			}

			const { email, password } = req.body;
			const userData = await UserService.registration(email, password);

			res.cookie("refreshToken", userData.refreshToken, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true });

			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await UserService.login(email, password);

			res.cookie("refreshToken", userData.refreshToken, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true });

			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async logout(req, res, next) {
		try {
		} catch (err) {
			next(err);
		}
	}

	async verify(req, res, next) {
		try {
			const verificationLink = req.params.link;
			await UserService.verify(verificationLink);

			return res.redirect(process.env.CLIENT_URL);
		} catch (err) {
			next(err);
		}
	}

	async refresh(req, res, next) {
		try {
		} catch (err) {
			next(err);
		}
	}

	async getUsers(req, res, next) {
		try {
			res.json(["123", "456", "789"]);
		} catch (err) {
			next(err);
		}
	}
}

export default new UserController();
