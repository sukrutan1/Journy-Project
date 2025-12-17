import type { MigrationConfig } from "drizzle-orm/migrator";
import "dotenv/config";

type Config = {
    api: APIConfig,
    db: DBConfig,
    jwt: JWTConfig,
};

type APIConfig = {
    port: number,
};


type DBConfig = {
    url: string,
    migrationConfig: MigrationConfig;
};

type JWTConfig = {
    secret: string,
}

function envOrThrow(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Enviroment variable ${key} is not set`);
    }

    return value;
};


const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/db/migrations",
}

export const config: Config = {
    api: {
        port: Number(envOrThrow("PORT")),
    },

    db: {
        url: envOrThrow("DB_URL"),
        migrationConfig: migrationConfig,
    },
    jwt: {
        secret: envOrThrow("JWT_SECRET"),
    }
};

