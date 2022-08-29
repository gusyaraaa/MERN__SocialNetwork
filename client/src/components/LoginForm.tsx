import { FC, useState } from "react";

export const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<div>
			<input onChange={(e) => setEmail(e.target.value)} type="text" value={email} placeholder="Email..." />
			<input onChange={(e) => setPassword(e.target.value)} type="text" value={password} placeholder="Password..." />
			<button>Логин</button>
			<button>Регистрация</button>
		</div>
	);
};
