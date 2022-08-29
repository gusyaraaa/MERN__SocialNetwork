import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);

app.use("/api", routes);
app.use(errorMiddleware);

const start = async () => {
	try {
		mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
	} catch (err) {
		console.log(err);
	}
};

start();
