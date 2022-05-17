import { Sequelize } from "sequelize";
import { initUserModel } from "./User.model";

const models = [initUserModel];

export let sequelize: Sequelize;
export const initSequelize = (
  db_name: string,
  db_username: string,
  db_password: string,
  db_hostname: string
) => {
  sequelize = new Sequelize(db_name, db_username, db_password, {
    host: db_hostname,
    dialect: "postgres",
    logging: false,
    define: {
      timestamps: false,
    },
  });
  for (let model of models) {
    model(sequelize);
  }
  sequelize.sync(); //{ force: true }
};
