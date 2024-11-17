import crypto from "node:crypto";

export type LocationCoordinates = {
	latitude: number;
	longitude: number;
};

export type CreateReportDTO = {
	street: string;
	city: string;
	state: string;
	neighborhood: string;
	referencePoint: string;
	locationCoordinates: LocationCoordinates;
};

export default class DengueReport {
	readonly id: string;
	readonly created_at: string;
	readonly street: string;
	readonly city: string;
	readonly state: string;
	readonly neighborhood: string;
	readonly referencePoint: string;
	readonly locationCoordinates: LocationCoordinates;

	private constructor(
		id: string,
		created_at: string,
		street: string,
		city: string,
		state: string,
		neighborhood: string,
		referencePoint: string,
		locationCoordinates: LocationCoordinates,
	) {
		this.id = id;
		this.created_at = created_at;
		this.street = street;
		this.city = city;
		this.state = state;
		this.neighborhood = neighborhood;
		this.referencePoint = referencePoint;
		this.locationCoordinates = locationCoordinates;
	}

	public static create(createReportDTO: CreateReportDTO): DengueReport {
		const {
			street,
			city,
			state,
			neighborhood,
			referencePoint,
			locationCoordinates,
		} = createReportDTO;
		const id = crypto.randomUUID();
		const created_at = new Date().toISOString();
		return new DengueReport(
			id,
			created_at,
			street,
			city,
			state,
			neighborhood,
			referencePoint,
			locationCoordinates,
		);
	}
}
