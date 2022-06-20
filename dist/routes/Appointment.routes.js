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
exports.AppointmentRouter.post("/create/:userId", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield (0, appointment_service_1.createAppointment)(req.body.appointment_date, req.body.appointment_hour, req.body.description, req.body.status, req.body.DoctorId, req.body.PatientId);
        res.statusCode = 200;
        res.send(appointment);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRouter.get("/patientApointments/:id/:userId", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(res.locals);
    try {
        const { id } = req.params;
        const allDoctorAppointments = yield (0, appointment_service_1.listPatientAppointments)(+id);
        res.statusCode = 200;
        res.send(allDoctorAppointments);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRouter.delete("/:id/:userId", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({
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
exports.AppointmentRouter.get("/doctorApointments/:id/:userId", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { limit, offset } = req.query;
        const allDoctorAppointments = yield (0, appointment_service_1.listDoctorAppointments)(+id, limit ? +limit : 5, offset ? +offset : 0);
        res.statusCode = 200;
        res.send(allDoctorAppointments);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AppointmentRouter.patch("/updateAppointment/:id/:userId", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({
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
exports.AppointmentRouter.get("/doctorApointments/:userId", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DoctorId, PatientId, appointment_date, appointment_hour } = JSON.parse(req.query.where || "{}");
        const where = {
            DoctorId,
            PatientId,
            appointment_date,
            appointment_hour,
        };
        if (!where.DoctorId)
            res.status(403).send({ error: "DoctorId is required" });
        if (!where.PatientId)
            delete where.PatientId;
        if (!where.appointment_date)
            delete where.appointment_date;
        if (!where.appointment_hour)
            delete where.appointment_hour;
        //  if (!where.orderWay) where.orderWay = "ASC";
        const searchAllDoctorAppointments = yield (0, appointment_service_1.filterDoctorAppointments)(where);
        res.status(200).send(searchAllDoctorAppointments);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
/* AppointmentRouter.get(
  "/doctorApointments/:id/:filter/:valueFilter/:orderWay",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    const { id, filter, valueFilter, orderWay } = req.params;
    const allDoctorAppointments = await filterDoctorAppointments(
      +id,
      filter,
      valueFilter,
      orderWay
    );
    res.statusCode = 200;
    res.send(allDoctorAppointments);
  }
);
 */
