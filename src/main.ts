import * as dotenv from "dotenv";
import CheckEnvironmentVariables from "./utils/CheckEnvironmentVariables";
import express from "express";
import compression from "compression";
import cors from "cors";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import ReportRepositoryDatabase from "./repository/ReportRepositoryDatabase";
import DengueReport from "./DengueReport";

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

const connection = new PgPromiseAdapter();
const ReportRepository = new ReportRepositoryDatabase(connection);

app.route("/reports").post(async (req, res, next) => {
	try {
		const report = DengueReport.create(req.body);
		const reportId = await ReportRepository.saveReport(report);
		if (!reportId)
			return res.status(400).json({ error: "Report not saved" });
		res.status(201).json({ reportId });
	} catch (error) {
		next(error);
	}
});

app.route("/reports").get(async (_req, res, next) => {
	try {
		const reports = await ReportRepository.getAllReports();
		res.status(200).json(reports);
	} catch (error) {
		next(error);
	}
});

app.use(
	(
		err: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		console.error(err.stack);
		res.status(500).json({ error: "Something went wrong!" });
	},
);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
