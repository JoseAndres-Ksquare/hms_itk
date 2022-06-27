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
exports.DoctorRouter = void 0;
const express_1 = require("express");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const appointment_service_1 = require("../services/appointment.service");
const doctor_service_1 = require("../services/doctor.service");
exports.DoctorRouter = (0, express_1.Router)();
exports.DoctorRouter.post("/createDoctor/:userId", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield (0, doctor_service_1.createDoctor)(req.body.medical_speciality, req.body.professional_license, req.body.ProfileId);
        res.statusCode = 200;
        res.send(patient);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.DoctorRouter.get("/appointmentPages/:id/:offset/:limit", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, offset, limit } = req.params;
        const pages = yield (0, appointment_service_1.paginationDoctorAppointments)(+id, +offset, +limit);
        res.status(200).send({ pages });
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.DoctorRouter.get("/readDoctor/:id/:userId", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const doctor = yield (0, doctor_service_1.fetchDoctor)(+id);
        res.status(200).send(doctor);
    }
    catch (error) {
        console.log(error);
    }
}));
/* DoctorRouter.get(
  "/alldoctors",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: false }),
  async (req: Request, res: Response) => {
    try {
      const doctors = await fetchDoctors();
      res.status(200).send(doctors);
    } catch (error) {
      console.log(error);
    }
  }
); */
exports.DoctorRouter.get("/doctorAndProfile/:id/:userId", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const patients = yield (0, doctor_service_1.doctorJoin)(+id);
        res.status(200).send(patients);
    }
    catch (error) {
        console.log(error);
    }
}));
