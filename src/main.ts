import * as dotenv from "dotenv";
import CheckEnvironmentVariables from "./utils/CheckEnvironmentVariables";
import express from "express";
import compression from "compression";
import cors from "cors";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";

dotenv.config();
CheckEnvironmentVariables.execute();
const app = express();
app.use(express.json());
app.use(compression());
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
	}),
);
// const connection = new PgPromiseAdapter();

app.route("/").get((req, res) => {
	res.send("Hello, World!");
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
