import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";
import { Patient } from "./Patient.model";
import { Doctor } from "./Doctor.model";

export class Appointment extends Model<
  InferAttributes<Appointment>,
  InferCreationAttributes<Appointment>
> {
  declare id: CreationOptional<number>;
  declare appointment_date: Date;
  declare appointment_hour: string;
  declare description: string;
  declare status: string; // in process, finished.
  DoctorId?: number;
  PatientId?: number;
}

export const initAppointmentModel = (sequelize: Sequelize) => {
  Appointment.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      appointment_date: { type: DataTypes.DATEONLY, allowNull: false },
      appointment_hour: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
    },

    { sequelize }
  );
  Appointment.belongsTo(Patient);
  Appointment.belongsTo(Doctor);
};
