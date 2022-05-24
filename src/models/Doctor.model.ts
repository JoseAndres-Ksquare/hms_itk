import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import { Profile } from "./Profile.model";

export class Doctor extends Model<
  InferAttributes<Doctor>,
  InferCreationAttributes<Doctor>
> {
  declare id: CreationOptional<number>;
  declare medical_speciality: string;
  declare professional_license: string;
  ProfileId?: number;
}

export const initDoctorModel = (sequelize: Sequelize) => {
  Doctor.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      medical_speciality: { type: DataTypes.STRING, allowNull: false },
      professional_license: { type: DataTypes.STRING, allowNull: false },
    },

    { sequelize }
  );
  Doctor.belongsTo(Profile, { targetKey: "id" });
};
