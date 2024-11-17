import * as dotenv from "dotenv";
dotenv.config();

export default class CheckEnvironmentVariables {
	private static readonly REQUIRED_ENV_VARS: string[] = [
		"PORT",
		"POSTGRES_PORT",
		"POSTGRES_USER",
		"POSTGRES_PASSWORD",
		"POSTGRES_DB",
		"POSTGRES_HOST",
	];

	static execute(): void {
		for (const varName of CheckEnvironmentVariables.REQUIRED_ENV_VARS) {
			if (!process.env[varName]) {
				// biome-ignore lint/suspicious/noConsole: <explanation>
				console.error(
					`Error: Required environment variable ${varName} is not defined`,
				);
				process.exit(1);
			}
		}
	}
}
