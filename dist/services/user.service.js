"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userChangeState = exports.createUser = void 0;
const User_model_1 = require("../models/User.model");
const createUser = (first_name, last_name, email, password, phone_number, address, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCreated = yield User_model_1.User.create({
            first_name,
            last_name,
            email,
            password,
            phone_number,
            address,
            role,
        });
        return userCreated;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createUser = createUser;
const userChangeState = (id, is_deleted) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userStatus = yield User_model_1.User.update({
            is_deleted: is_deleted,
        }, { where: { id: id } });
        return userStatus;
    }
    catch (error) {
        console.error(error);
    }
});
exports.userChangeState = userChangeState;
