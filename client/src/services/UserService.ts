import instance from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

export class UserService {
	static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return instance.get<IUser[]>("/user/users");
	}
}
