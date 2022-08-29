export default class UserDto {
	email;
	id;
	isVerified;

	constructor(model) {
		this.email = model.email;
		this.id = model._id;
		this.isVerified = model.isVerified;
	}
}
