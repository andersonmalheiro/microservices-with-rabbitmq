import { Sequelize } from "sequelize";

const DB_USER = process.env.POSTGRES_USER || "admin";
const DB_PASSWORD = process.env.POSTGRES_PASSWORD || "12345";
const DB_NAME = process.env.POSTGRES_DB || "auth-db";
const DB_HOST = process.env.POSTGRES_HOST || "localhost";
const DB_PORT = process.env.POSTGRES_PORT;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT) || 5432,
  dialect: "postgres",
  quoteIdentifiers: false,
  define: {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.info("Connection has been stablished");
  })
  .catch((err) => {
    console.error(err.message);
  });

export default sequelize;
