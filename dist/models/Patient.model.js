"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPatientModel = exports.Patient = void 0;
const sequelize_1 = require("sequelize");
const Profile_model_1 = require("./Profile.model");
class Patient extends sequelize_1.Model {
}
exports.Patient = Patient;
const initPatientModel = (sequelize) => {
    Patient.init({
        id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        birth_date: { type: sequelize_1.DataTypes.DATE, allowNull: false },
        age: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        blood_type: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        alergies: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        gender: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    }, { sequelize });
    Patient.belongsTo(Profile_model_1.Profile, { targetKey: "id" });
};
exports.initPatientModel = initPatientModel;
