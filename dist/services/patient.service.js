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
exports.allPatientsJoin = exports.patientJoin = exports.fetchPatient = exports.fetchPatients = exports.createPatient = void 0;
const Patient_model_1 = require("../models/Patient.model");
const Profile_model_1 = require("../models/Profile.model");
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
        throw error;
    }
});
exports.createPatient = createPatient;
const fetchPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPatients = yield Patient_model_1.Patient.findAll();
        return allPatients;
    }
    catch (error) {
        throw error;
    }
});
exports.fetchPatients = fetchPatients;
const fetchPatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readPatient = yield Patient_model_1.Patient.findAll({ where: { ProfileId: id } });
        return readPatient;
    }
    catch (error) {
        throw error;
    }
});
exports.fetchPatient = fetchPatient;
const patientJoin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientAndProfile = yield Patient_model_1.Patient.findAll({
            where: { ProfileId: id },
            include: [{ model: Profile_model_1.Profile, required: true }],
        });
        return patientAndProfile;
    }
    catch (errors) {
        throw errors;
    }
});
exports.patientJoin = patientJoin;
const allPatientsJoin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientsAndProfiles = yield Patient_model_1.Patient.findAll({
            include: [{ model: Profile_model_1.Profile, required: true }],
        });
        return patientsAndProfiles;
    }
    catch (errors) {
        throw errors;
    }
});
exports.allPatientsJoin = allPatientsJoin;
