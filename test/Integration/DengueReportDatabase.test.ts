import DengueReport from "../../src/DengueReport";
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import ReportRepositoryDatabase from "../../src/repository/ReportRepositoryDatabase";

test("Should save a dengue report in database", async () => {
	const createReportDTO = {
		street: "Rua 1",
		city: "Cidade 1",
		state: "Estado 1",
		neighborhood: "Bairro 1",
		referencePoint: "Ponto de referência 1",
		locationCoordinates: {
			latitude: 23,
			longitude: 39,
		},
	};

	const connection = new PgPromiseAdapter();
	const reportRepository = new ReportRepositoryDatabase(connection);

	const dengueReport = DengueReport.create(createReportDTO);
	const reportId = await reportRepository.saveReport(dengueReport);
	const dengueReportFromDatabase =
		await reportRepository.findReportByReportId(reportId);

	await reportRepository.deleteReportByReportId(reportId);

	expect(dengueReportFromDatabase?.report_id).toBe(reportId);
	expect(dengueReportFromDatabase?.city).toBe(createReportDTO.city);
	expect(dengueReportFromDatabase?.state).toBe(createReportDTO.state);
	expect(dengueReportFromDatabase?.street).toBe(createReportDTO.street);
	expect(dengueReportFromDatabase?.neighborhood).toBe(
		createReportDTO.neighborhood,
	);
	expect(dengueReportFromDatabase?.reference_point).toBe(
		createReportDTO.referencePoint,
	);
	expect(dengueReportFromDatabase?.location_coordinates).toEqual(
		createReportDTO.locationCoordinates,
	);
	await connection.close();
});

test("Should delete a dengue report from database by id", async () => {
	const createReportDTO = {
		street: "Rua 1",
		city: "Cidade 1",
		state: "Estado 1",
		neighborhood: "Bairro 1",
		referencePoint: "Ponto de referência 1",
		locationCoordinates: {
			latitude: 23,
			longitude: 39,
		},
	};
	const connection = new PgPromiseAdapter();
	const reportRepository = new ReportRepositoryDatabase(connection);
	const dengueReport = DengueReport.create(createReportDTO);
	const reportId = await reportRepository.saveReport(dengueReport);

	await reportRepository.deleteReportByReportId(reportId);

	const dengueReportFromDatabase =
		await reportRepository.findReportByReportId(reportId);

	expect(dengueReportFromDatabase).toBeNull();
	await connection.close();
});
