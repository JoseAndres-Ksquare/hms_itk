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
exports.AppointmentRouter = void 0;
const express_1 = require("express");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const appointment_service_1 = require("../services/appointment.service");
exports.AppointmentRouter = (0, express_1.Router)();
exports.AppointmentRouter.post("/create", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield (0, appointment_service_1.createAppointment)(req.body.appointment_date, req.body.appointment_hour, req.body.description, req.body.status, req.body.DoctorId, req.body.PatientId);
    res.statusCode = 200;
    res.send(appointment);
}));
exports.AppointmentRouter.get("/patientApointments/:id", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const allDoctorAppointments = yield (0, appointment_service_1.listPatientAppointments)(+id);
    res.statusCode = 200;
    res.send(allDoctorAppointments);
}));
exports.AppointmentRouter.get("/:id", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const allAppointments = yield (0, appointment_service_1.findAppointment)(+id);
    res.statusCode = 200;
    res.send(allAppointments);
}));
exports.AppointmentRouter.delete("/:id", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({
    roles: ["Admin"],
    allowSameUser: true,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const status = "finished";
    try {
        yield (0, appointment_service_1.deleteAppointment)(+id, status);
        return res.status(200).send("appointment cancelled with id: " + id);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRouter.get("/doctorApointments/:id", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const allDoctorAppointments = yield (0, appointment_service_1.listDoctorAppointments)(+id);
    res.statusCode = 200;
    res.send(allDoctorAppointments);
}));
exports.AppointmentRouter.patch("/updateAppointment/:id", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({
    roles: ["Admin"],
    allowSameUser: true,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { appointment_date, appointment_hour } = req.body;
    try {
        const appointmentUpdated = yield (0, appointment_service_1.doctorModifyAppointment)(+id, appointment_date, appointment_hour);
        return res.status(200).send(appointmentUpdated);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRouter.get("/doctorApointments/:id/:filter/:valueFilter/:orderWay", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, filter, valueFilter, orderWay } = req.params;
    const allDoctorAppointments = yield (0, appointment_service_1.filterDoctorAppointments)(+id, filter, valueFilter, orderWay);
    res.statusCode = 200;
    res.send(allDoctorAppointments);
}));
exports.AppointmentRouter.get("/orderAppointments/:column", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
