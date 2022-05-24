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
    console.error(error);
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
    console.error(error);
  }
};
export const listPatientAppointments = async (id: number) => {
  try {
    const allAppointments = await Appointment.findAll({
      where: { PatientId: id },
    });
    return allAppointments;
  } catch (error) {
    console.error(error);
  }
};

export const findAppointment = async (id: number) => {
  try {
    const allAppointments = await Appointment.findByPk(id);
    return allAppointments;
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
};

export const listDoctorAppointments = async (id: number) => {
  try {
    const allAppointments = await Appointment.findAll({
      where: { DoctorId: id },
    });
    return allAppointments;
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
};

export const filterDoctorAppointments = async (
  id: number,
  filter: string,
  valueFilter: any,
  orderWay: string
) => {
  try {
    let filterDocAppointments;
    switch (filter) {
      case "PatientId":
        filterDocAppointments = Appointment.findAll({
          where: {
            DoctorId: id,
            PatientId: valueFilter,
          },
          order: [["id", orderWay]],
        });
        break;
      case "appointment_date":
        filterDocAppointments = Appointment.findAll({
          where: {
            DoctorId: id,
            appointment_date: valueFilter,
          },
          order: [["id", orderWay]],
        });
        break;
      case "appointment_hour":
        filterDocAppointments = Appointment.findAll({
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
  } catch (error) {
    console.error(error);
  }
};

export const listFinishedAppointments = async (status: string) => {
  try {
    const allFinishedAppointments = await Appointment.findAll({
      where: { status: status },
    });
    return allFinishedAppointments;
  } catch (error) {
    console.error(error);
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
