import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import { env } from "process";
import { DataTypes, Sequelize } from "sequelize";
import * as config from "../config";
import { DBConfig, Environment } from '../config';
const basename = _basename(__filename);
const currentEnv: Environment = (env.NODE_ENV ?? "development") as Environment;

const currentConfig = (config as DBConfig)[currentEnv];

type DB = {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: any;
};

const db: DB = {} as DB;

let sequelize: Sequelize;
if (currentConfig.use_env_variable) {
  sequelize = new Sequelize(
    env[currentConfig.use_env_variable] as any,
    currentConfig
  );
} else {
  sequelize = new Sequelize(
    currentConfig.database!,
    currentConfig.username!,
    currentConfig.password,
    currentConfig
  );
}

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
