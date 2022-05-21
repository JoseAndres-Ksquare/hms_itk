"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAppointmentModel = exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
const Patient_model_1 = require("./Patient.model");
const Doctor_model_1 = require("./Doctor.model");
class Appointment extends sequelize_1.Model {
}
exports.Appointment = Appointment;
const initAppointmentModel = (sequelize) => {
    Appointment.init({
        id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        appointment_date: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
        appointment_hour: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        status: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    }, { sequelize });
    Appointment.belongsTo(Patient_model_1.Patient);
    Appointment.belongsTo(Doctor_model_1.Doctor);
};
exports.initAppointmentModel = initAppointmentModel;
