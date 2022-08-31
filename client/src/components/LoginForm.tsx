import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import { Context } from "..";

export const LoginForm: FC = observer(() => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { store } = useContext(Context);

	return (
		<div>
			<input onChange={(e) => setEmail(e.target.value)} type="text" value={email} placeholder="Email..." />
			<input onChange={(e) => setPassword(e.target.value)} type="text" value={password} placeholder="Password..." />
			<button onClick={() => store.login(email, password)}>Логин</button>
			<button onClick={() => store.registration(email, password)}>Регистрация</button>
		</div>
	);
});
