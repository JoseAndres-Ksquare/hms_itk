import { Router, Request, Response } from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
import {
  createAppointment,
  deleteAppointment,
  doctorModifyAppointment,
  filterDoctorAppointments,
  findAppointment,
  listDoctorAppointments,
  listPatientAppointments,
} from "../services/appointment.service";

export const AppointmentRouter = Router();

AppointmentRouter.post(
  "/create",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    const appointment = await createAppointment(
      req.body.appointment_date,
      req.body.appointment_hour,
      req.body.description,
      req.body.status,
      req.body.DoctorId,
      req.body.PatientId
    );
    res.statusCode = 200;
    res.send(appointment);
  }
);

listPatientAppointments;
AppointmentRouter.get(
  "/patientApointments/:id",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const allDoctorAppointments = await listPatientAppointments(+id);
    res.statusCode = 200;
    res.send(allDoctorAppointments);
  }
);

AppointmentRouter.get(
  "/:id",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const allAppointments = await findAppointment(+id);
    res.statusCode = 200;
    res.send(allAppointments);
  }
);

AppointmentRouter.delete(
  "/:id",
  isAuth,
  hasRole({
    roles: ["Admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const status = "finished";

    try {
      await deleteAppointment(+id, status);
      return res.status(200).send("appointment cancelled with id: " + id);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

AppointmentRouter.get(
  "/doctorApointments/:id",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const allDoctorAppointments = await listDoctorAppointments(+id);
    res.statusCode = 200;
    res.send(allDoctorAppointments);
  }
);

AppointmentRouter.patch(
  "/updateAppointment/:id",
  isAuth,
  hasRole({
    roles: ["Admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { appointment_date, appointment_hour } = req.body;

    try {
      const appointmentUpdated = await doctorModifyAppointment(
        +id,
        appointment_date,
        appointment_hour
      );
      return res.status(200).send(appointmentUpdated);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

AppointmentRouter.get(
  "/doctorApointments/:id/:filter/:valueFilter",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    const { id, filter, valueFilter } = req.params;
    const allDoctorAppointments = await filterDoctorAppointments(
      +id,
      filter,
      valueFilter
    );
    res.statusCode = 200;
    res.send(allDoctorAppointments);
  }
);
