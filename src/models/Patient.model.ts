import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import { Profile } from "./Profile.model";

export class Patient extends Model<
  InferAttributes<Patient>,
  InferCreationAttributes<Patient>
> {
  declare id: CreationOptional<number>;
  declare birth_date: Date;
  declare age: string;
  declare blood_type: string;
  declare alergies: string;
  declare gender: string;
  ProfileId?: number;
}

export const initPatientModel = (sequelize: Sequelize) => {
  Patient.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      birth_date: { type: DataTypes.DATE, allowNull: false },
      age: { type: DataTypes.STRING, allowNull: false },
      blood_type: { type: DataTypes.STRING, allowNull: false },
      alergies: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: false },
    },

    { sequelize }
  );
  Patient.belongsTo(Profile, { targetKey: "id" });
};
