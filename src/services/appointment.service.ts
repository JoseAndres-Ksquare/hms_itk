import { Appointment } from "../models/Appointments.model";

export const createAppointment = async (
  appointment_date: Date,
  appointment_hour: string,
  description: string,
  status: string,
  DoctorId?: number,
  PatientId?: number
) => {
  try {
    const appointmentCreated = await Appointment.create({
      appointment_date,
      appointment_hour,
      description,
      status,
      DoctorId,
      PatientId,
    });
    return appointmentCreated;
  } catch (error) {
    throw error;
  }
};

export const listAppointments = async (offset?: number, limit?: number) => {
  try {
    const allAppointments = await Appointment.findAll({
      limit: limit,
      offset: offset,
    });
    return allAppointments;
  } catch (error) {
    throw error;
  }
};
export const listPatientAppointments = async (id: number) => {
  try {
    const allAppointments = await Appointment.findAll({
      where: { PatientId: id, status: "In progress" },
    });
    return allAppointments;
  } catch (error) {
    throw error;
  }
};

export const listPatientAppointmentsFinished = async (id: number) => {
  try {
    const allAppointments = await Appointment.findAll({
      where: { PatientId: id, status: "Finished" },
    });
    return allAppointments;
  } catch (error) {
    throw error;
  }
};

export const findAppointment = async (id: number) => {
  try {
    const allAppointments = await Appointment.findByPk(id);
    return allAppointments;
  } catch (error) {
    throw error;
  }
};

export const deleteAppointment = async (id: number, status: string) => {
  try {
    const deleteAppointment = await Appointment.update(
      { status: status },
      { where: { id: id } }
    );
    return deleteAppointment;
  } catch (error) {
    throw error;
  }
};

export const listDoctorAppointments = async (
  id: number,
  limit?: number,
  offset?: number
) => {
  try {
    const allAppointments = await Appointment.findAll({
      where: { DoctorId: id },
      limit: limit,
      offset: offset,
    });
    return allAppointments;
  } catch (error) {
    throw error;
  }
};

export const doctorModifyAppointment = async (
  id: number,
  date?: Date,
  hour?: string
) => {
  try {
    const modifyAppointmentDate = await Appointment.update(
      { appointment_date: date, appointment_hour: hour },
      { where: { id: id } }
    );
    return modifyAppointmentDate;
  } catch (error) {
    throw error;
  }
};

export const filterDoctorAppointments = async (where: any) => {
  try {
    const filterDocAppointments = Appointment.findAll({
      where,
    });

    return filterDocAppointments;
  } catch (error) {
    throw error;
  }
};

export const DoctorAppointmentsAdmin = async (where: any) => {
  try {
    const filterDocAppointments = Appointment.findAll({
      where,
    });

    return filterDocAppointments;
  } catch (error) {
    throw error;
  }
};

export const listFinishedAppointments = async (status: string) => {
  try {
    const allFinishedAppointments = await Appointment.findAll({
      where: { status: status },
    });
    return allFinishedAppointments;
  } catch (error) {
    throw error;
  }
};

export const paginationPatientAppointments = async (
  id: number,
  offset: number,
  limit: number
) => {
  const AppointmentPages = await Appointment.findAll({
    where: { PatientId: id },
    limit: limit,
    offset: offset,
  });
  return AppointmentPages;
};

export const paginationDoctorAppointments = async (
  id: number,
  offset: number,
  limit: number
) => {
  const AppointmentPages = await Appointment.findAll({
    where: { DoctorId: id },
    limit: limit,
    offset: offset,
  });
  return AppointmentPages;
};

export const changeColumnWay = async (filter: string) => {
  const changeWay = await Appointment.findAll({
    order: [[filter, "ASC"]],
  });
  return changeWay;
};
