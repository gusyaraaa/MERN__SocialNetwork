import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { Context } from ".";
import { LoginForm } from "./components/LoginForm";
import { IUser } from "./models/IUser";
import { UserService } from "./services/UserService";
import "./index.css";

export const App: FC = observer(() => {
	const { store } = useContext(Context);
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			store.checkAuth();
		}
	}, [store]);

	const getUsers = async () => {
		try {
			const response = await UserService.fetchUsers();
			setUsers(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	if (store.isLoading) {
		return <div>Загрузка...</div>;
	}

	if (!store.isAuth) {
		return <LoginForm />;
	}

	return (
		<div className="App">
			<h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : "АВТОРИЗУЙТЕСЬ"}</h1>
			<button onClick={() => store.logout()}>Выйти</button>
			<div>
				<button onClick={getUsers}>Получить список пользователей</button>
			</div>
			{users.map((user) => (
				<div key={user.email}>{user.email}</div>
			))}
		</div>
	);
});
