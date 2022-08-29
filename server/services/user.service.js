import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import MailService from "./mail.service.js";
import TokenService from "./token.service.js";
import UserDto from "../dtos/user.dto.js";
import ApiError from "../exceptions/apiError.js";

class UserService {
	async registration(email, password) {
		const candidate = await UserModel.findOne({ email });

		if (candidate) {
			throw ApiError.BadRequest("Пользователь уже существует");
		}

		const salt = 5;
		const passwordHash = await bcrypt.hash(password, salt);
		const verificationLink = uuidv4();

		const user = await UserModel.create({ email, password: passwordHash, verificationLink });
		await MailService.sendVerificationMail(email, `${process.env.API_URL}/api/user/verify/${verificationLink}`);

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	async verify(verificationLink) {
		const user = await UserModel.findOne({ verificationLink });

		if (!user) {
			throw ApiError.BadRequest("Некорректная ссылка верификации");
		}

		user.isVerified = true;
		await user.save();
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email });

		if (!user) {
			throw ApiError.BadRequest("Пользователь не был найден");
		}

		const isPassEquals = await bcrypt.compare(password, user.password);

		if (!isPassEquals) {
			throw ApiError.BadRequest("Неверный пароль");
		}

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	async logout(refreshToken) {
		const token = await TokenService.removeToken(refreshToken);

		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const userData = TokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await TokenService.findToken(refreshToken);

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}

		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	async getAllUsers() {
		const users = await UserModel.find();

		return users;
	}
}

export default new UserService();
