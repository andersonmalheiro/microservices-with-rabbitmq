const { env } = process;
import { Options } from 'sequelize';

const DB_USER = env.POSTGRES_USER || "admin";
const DB_PASSWORD = env.POSTGRES_PASSWORD || "12345";
const DB_NAME = env.POSTGRES_DB || "auth-db";
const DB_HOST = env.POSTGRES_HOST || "localhost";
const DB_PORT = env.POSTGRES_PORT;

export type Environment = "development" | "production" | "test";

type ExtendedOptions = Options & {
  use_env_variable?: string;
}

export type DBConfig = Record<Environment, ExtendedOptions>;

const config: DBConfig = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: undefined,
    database: "database_test",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: undefined,
    database: "database_production",
    host: "localhost",
    dialect: "postgres",
  },
};

module.exports = config;