"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = exports.Profile = void 0;
const sequelize_1 = require("sequelize");
class Profile extends sequelize_1.Model {
}
exports.Profile = Profile;
const initUserModel = (sequelize) => {
    Profile.init({
        id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        first_name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        last_name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
        password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        phone_number: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        address: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        is_deleted: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    }, { sequelize });
};
exports.initUserModel = initUserModel;
