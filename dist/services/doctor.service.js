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
exports.allDoctorsJoin = exports.doctorJoin = exports.fetchDoctors = exports.fetchDoctor = exports.createDoctor = void 0;
const Doctor_model_1 = require("../models/Doctor.model");
const Profile_model_1 = require("../models/Profile.model");
const createDoctor = (medical_speciality, professional_license, ProfileId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorCreated = yield Doctor_model_1.Doctor.create({
            medical_speciality,
            professional_license,
            ProfileId,
        });
        return doctorCreated;
    }
    catch (error) {
        throw error;
    }
});
exports.createDoctor = createDoctor;
const fetchDoctor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readDoctor = yield Doctor_model_1.Doctor.findAll({ where: { ProfileId: id } });
        return readDoctor;
    }
    catch (error) {
        throw error;
    }
});
exports.fetchDoctor = fetchDoctor;
const fetchDoctors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDoctors = yield Doctor_model_1.Doctor.findAll();
        return allDoctors;
    }
    catch (error) {
        throw error;
    }
});
exports.fetchDoctors = fetchDoctors;
const doctorJoin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorAndProfile = yield Doctor_model_1.Doctor.findAll({
            where: { ProfileId: id },
            include: [{ model: Profile_model_1.Profile, required: true }],
        });
        return doctorAndProfile;
    }
    catch (errors) {
        throw errors;
    }
});
exports.doctorJoin = doctorJoin;
const allDoctorsJoin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorsAndProfiles = yield Doctor_model_1.Doctor.findAll({
            include: [{ model: Profile_model_1.Profile, required: true }],
        });
        return doctorsAndProfiles;
    }
    catch (errors) {
        throw errors;
    }
});
exports.allDoctorsJoin = allDoctorsJoin;
