import DengueReport from "../../src/DengueReport";

test("Should create a dengue report", () => {
	const createReportDTO = {
		street: "Rua 1",
		city: "Cidade 1",
		state: "Estado 1",
		neighborhood: "Bairro 1",
		referencePoint: "Ponto de referência 1",
		locationCoordinates: {
			latitude: 0,
			longitude: 0,
		},
	};
	const dengueReport = DengueReport.create(createReportDTO);
	expect(dengueReport).toEqual({
		id: expect.any(String),
		created_at: expect.any(String),
		street: "Rua 1",
		city: "Cidade 1",
		state: "Estado 1",
		neighborhood: "Bairro 1",
		referencePoint: "Ponto de referência 1",
		locationCoordinates: {
			latitude: 0,
			longitude: 0,
		},
	});
});
