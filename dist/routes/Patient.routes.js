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
exports.PatientRouter = void 0;
const express_1 = require("express");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const appointment_service_1 = require("../services/appointment.service");
const patient_service_1 = require("../services/patient.service");
exports.PatientRouter = (0, express_1.Router)();
exports.PatientRouter.post("/createPatient", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.birth_date ||
        !req.body.age ||
        !req.body.blood_type ||
        !req.body.alergies ||
        !req.body.gender ||
        !req.body.ProfileId) {
        res.status(400);
        return res.send({ error: "All fields are required" });
    }
    const patient = yield (0, patient_service_1.createPatient)(req.body.birth_date, req.body.age, req.body.blood_type, req.body.alergies, req.body.gender, req.body.ProfileId);
    res.statusCode = 200;
    res.send(patient);
}));
exports.PatientRouter.get("/appointmentPages/:id/:offset/:limit", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, offset, limit } = req.params;
    const pages = yield (0, appointment_service_1.paginationPatientAppointments)(+id, +offset, +limit);
    res.status(200).send({ pages });
}));
//SELECT * FROM "Profiles" INNER JOIN "Patients" ON "Profiles".id= "Patients"."ProfileId";
