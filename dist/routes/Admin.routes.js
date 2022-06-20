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
exports.AdminRouter = void 0;
const express_1 = require("express");
const methods_1 = require("../firebase/methods");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const appointment_service_1 = require("../services/appointment.service");
exports.AdminRouter = (0, express_1.Router)();
exports.AdminRouter.post("/createrDoctor", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    if (role !== "Doctor") {
        res.status(400);
        return res.send({ error: "All fields are required" });
    }
    if (!email || !password || !role) {
        res.status(400);
        return res.send({ error: "All fields are required" });
    }
    try {
        const userDoctorId = yield (0, methods_1.createUser)(email, password, role, false);
        res.status(201).send({
            userDoctorId,
        });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AdminRouter.patch("/activateUser", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({
    roles: ["Admin"],
    allowSameUser: false,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield (0, methods_1.disableUser)(userId, false);
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AdminRouter.get("/listAppointments", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAppointments = yield (0, appointment_service_1.listAppointments)();
        res.statusCode = 200;
        res.send(allAppointments);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
exports.AdminRouter.get("/listFinishedAppointments/:status", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.params;
    try {
        const allFinishedAppointments = yield (0, appointment_service_1.listFinishedAppointments)(status);
        res.statusCode = 200;
        res.send(allFinishedAppointments);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
/* AdminRouter.get(
  "/listAppointmentsByColumn/:filter",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: false }),
  async (req: Request, res: Response) => {
    const { filter } = req.params;
    try {
      const allAppointments = await changeColumnWay(filter);
      res.statusCode = 200;
      res.send(allAppointments);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
); */
//query Param
exports.AdminRouter.get("/filterAppointments", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({ roles: ["Admin"], allowSameUser: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DoctorId, PatientId, status } = JSON.parse(req.query.where || "{}");
        const where = {
            DoctorId,
            PatientId,
            status,
        };
        Object.keys(where).forEach((key) => {
            where[key] === undefined ? delete where[key] : {};
        });
        const searchAllDoctorAppointments = yield (0, appointment_service_1.DoctorAppointmentsAdmin)(where);
        res.status(200).send(searchAllDoctorAppointments);
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
