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
exports.changeColumnWay = exports.paginationDoctorAppointments = exports.paginationPatientAppointments = exports.listFinishedAppointments = exports.filterDoctorAppointments = exports.doctorModifyAppointment = exports.listDoctorAppointments = exports.deleteAppointment = exports.findAppointment = exports.listPatientAppointments = exports.listAppointments = exports.createAppointment = void 0;
const Appointments_model_1 = require("../models/Appointments.model");
const createAppointment = (appointment_date, appointment_hour, description, status, DoctorId, PatientId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentCreated = yield Appointments_model_1.Appointment.create({
            appointment_date,
            appointment_hour,
            description,
            status,
            DoctorId,
            PatientId,
        });
        return appointmentCreated;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createAppointment = createAppointment;
const listAppointments = (offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAppointments = yield Appointments_model_1.Appointment.findAll({
            limit: limit,
            offset: offset,
        });
        return allAppointments;
    }
    catch (error) {
        console.error(error);
    }
});
exports.listAppointments = listAppointments;
const listPatientAppointments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAppointments = yield Appointments_model_1.Appointment.findAll({
            where: { PatientId: id },
        });
        return allAppointments;
    }
    catch (error) {
        console.error(error);
    }
});
exports.listPatientAppointments = listPatientAppointments;
const findAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAppointments = yield Appointments_model_1.Appointment.findByPk(id);
        return allAppointments;
    }
    catch (error) {
        console.error(error);
    }
});
exports.findAppointment = findAppointment;
const deleteAppointment = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteAppointment = yield Appointments_model_1.Appointment.update({ status: status }, { where: { id: id } });
        return deleteAppointment;
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteAppointment = deleteAppointment;
const listDoctorAppointments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAppointments = yield Appointments_model_1.Appointment.findAll({
            where: { DoctorId: id },
        });
        return allAppointments;
    }
    catch (error) {
        console.error(error);
    }
});
exports.listDoctorAppointments = listDoctorAppointments;
const doctorModifyAppointment = (id, date, hour) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modifyAppointmentDate = yield Appointments_model_1.Appointment.update({ appointment_date: date, appointment_hour: hour }, { where: { id: id } });
        return modifyAppointmentDate;
    }
    catch (error) {
        console.error(error);
    }
});
exports.doctorModifyAppointment = doctorModifyAppointment;
const filterDoctorAppointments = (id, filter, valueFilter, orderWay) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filterDocAppointments;
        switch (filter) {
            case "PatientId":
                filterDocAppointments = Appointments_model_1.Appointment.findAll({
                    where: {
                        DoctorId: id,
                        PatientId: valueFilter,
                    },
                    order: [["id", orderWay]],
                });
                break;
            case "appointment_date":
                filterDocAppointments = Appointments_model_1.Appointment.findAll({
                    where: {
                        DoctorId: id,
                        appointment_date: valueFilter,
                    },
                    order: [["id", orderWay]],
                });
                break;
            case "appointment_hour":
                filterDocAppointments = Appointments_model_1.Appointment.findAll({
                    where: {
                        DoctorId: id,
                        appointment_hour: valueFilter,
                    },
                    order: [["id", orderWay]],
                });
                break;
            default:
                break;
        }
        return filterDocAppointments;
    }
    catch (error) {
        console.error(error);
    }
});
exports.filterDoctorAppointments = filterDoctorAppointments;
const listFinishedAppointments = (status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allFinishedAppointments = yield Appointments_model_1.Appointment.findAll({
            where: { status: status },
        });
        return allFinishedAppointments;
    }
    catch (error) {
        console.error(error);
    }
});
exports.listFinishedAppointments = listFinishedAppointments;
const paginationPatientAppointments = (id, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const AppointmentPages = yield Appointments_model_1.Appointment.findAll({
        where: { PatientId: id },
        limit: limit,
        offset: offset,
    });
    return AppointmentPages;
});
exports.paginationPatientAppointments = paginationPatientAppointments;
const paginationDoctorAppointments = (id, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const AppointmentPages = yield Appointments_model_1.Appointment.findAll({
        where: { DoctorId: id },
        limit: limit,
        offset: offset,
    });
    return AppointmentPages;
});
exports.paginationDoctorAppointments = paginationDoctorAppointments;
const changeColumnWay = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const changeWay = yield Appointments_model_1.Appointment.findAll({
        order: [[filter, "ASC"]],
    });
    return changeWay;
});
exports.changeColumnWay = changeColumnWay;
