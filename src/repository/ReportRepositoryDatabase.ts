import type { LocationCoordinates } from "../DengueReport";
import type DengueReport from "../DengueReport";
import type DataBaseConnection from "../infra/database/DatabaseConnection";

export type ReportDAO = {
	report_id: string;
	created_at: string;
	street: string;
	city: string;
	state: string;
	neighborhood: string;
	reference_point: string;
	location_coordinates: LocationCoordinates;
};

interface ReportRepository {
	getAllReports(): Promise<ReportDAO[]>;
	saveReport(report: DengueReport): Promise<string>;
	findReportByReportId(id: string): Promise<ReportDAO | null>;
	deleteReportByReportId(id: string): Promise<void>;
}

export default class ReportRepositoryDatabase implements ReportRepository {
	constructor(readonly connection: DataBaseConnection) {}

	async getAllReports(): Promise<ReportDAO[]> {
		const reports = await this.connection.query("SELECT * FROM report", []);
		if (!reports || reports.length < 1) return [];
		return reports;
	}

	async saveReport(report: DengueReport): Promise<string> {
		const {
			id,
			created_at,
			street,
			city,
			state,
			neighborhood,
			referencePoint,
			locationCoordinates,
		} = report;
		await this.connection.query(
			`INSERT INTO report
            (report_id, created_at, street, city, state, neighborhood, reference_point, location_coordinates)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)`,
			[
				id,
				created_at,
				street,
				city,
				state,
				neighborhood,
				referencePoint,
				locationCoordinates,
			],
		);
		return id;
	}

	async findReportByReportId(id: string): Promise<ReportDAO | null> {
		const report = await this.connection.query(
			"SELECT * FROM report WHERE report_id = $1",
			[id],
		);
		if (!report || report.length < 1) return null;
		return report[0];
	}

	async deleteReportByReportId(id: string): Promise<void> {
		await this.connection.query("DELETE FROM report WHERE report_id = $1", [
			id,
		]);
	}
}
