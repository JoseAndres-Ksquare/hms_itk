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
exports.createPatient = void 0;
const Patient_model_1 = require("../models/Patient.model");
const createPatient = (birth_date, age, blood_type, alergies, gender, ProfileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientCreated = yield Patient_model_1.Patient.create({
            birth_date,
            age,
            blood_type,
            alergies,
            gender,
            ProfileId,
        });
        return patientCreated;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createPatient = createPatient;
