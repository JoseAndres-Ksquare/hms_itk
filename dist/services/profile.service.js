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
exports.createProfile = void 0;
const Profile_model_1 = require("../models/Profile.model");
const createProfile = (first_name, last_name, phone_number, address, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCreated = yield Profile_model_1.Profile.create({
            first_name,
            last_name,
            phone_number,
            address,
            user_id,
        });
        return userCreated;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createProfile = createProfile;
