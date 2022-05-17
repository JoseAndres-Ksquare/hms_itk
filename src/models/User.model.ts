import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare password: string;
  declare phone_number: string;
  declare address: string;
  declare role: string;
  declare is_deleted: CreationOptional<boolean>;
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      phone_number: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { sequelize }
  );
};
