"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDoctorModel = exports.Doctor = void 0;
const sequelize_1 = require("sequelize");
const Profile_model_1 = require("./Profile.model");
class Doctor extends sequelize_1.Model {
}
exports.Doctor = Doctor;
const initDoctorModel = (sequelize) => {
    Doctor.init({
        id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        medical_speciality: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        professional_license: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    }, { sequelize });
    Doctor.belongsTo(Profile_model_1.Profile);
};
exports.initDoctorModel = initDoctorModel;
