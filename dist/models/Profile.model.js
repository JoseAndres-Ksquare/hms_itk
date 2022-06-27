"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProfileModel = exports.Profile = void 0;
const sequelize_1 = require("sequelize");
class Profile extends sequelize_1.Model {
}
exports.Profile = Profile;
const initProfileModel = (sequelize) => {
    Profile.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        first_name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        last_name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        phone_number: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        address: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        user_id: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    }, { sequelize });
};
exports.initProfileModel = initProfileModel;
