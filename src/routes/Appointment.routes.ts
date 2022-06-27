import { Router, Request, Response } from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
import {
  createAppointment,
  deleteAppointment,
  doctorModifyAppointment,
  filterDoctorAppointments,
  listDoctorAppointments,
  listPatientAppointments,
  listPatientAppointmentsFinished,
} from "../services/appointment.service";

export const AppointmentRouter = Router();

AppointmentRouter.post(
  "/create/:userId",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
      console.log(error);

      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

AppointmentRouter.get(
  "/patientApointments/:id/:userId",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const allDoctorAppointments = await listPatientAppointments(+id);
      res.statusCode = 200;
      res.send(allDoctorAppointments);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);
AppointmentRouter.get(
  "/patientApointmentsFinished/:id/:userId",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const allDoctorAppointments = await listPatientAppointmentsFinished(+id);
      res.statusCode = 200;
      res.send(allDoctorAppointments);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

AppointmentRouter.delete(
  "/:id/:userId",
  isAuth,
  hasRole({
    roles: ["Admin"],
    allowSameUser: true,
  }),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const status = "Finished";

    try {
      await deleteAppointment(+id, status);
      return res.status(200).send("appointment cancelled with id: " + id);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

AppointmentRouter.get(
  "/doctorApointment/:id/:userId",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { limit, offset } = req.query;
      const allDoctorAppointments = await listDoctorAppointments(
        +id,
        limit ? +limit : 5,
        offset ? +offset : 0
      );
      res.statusCode = 200;
      res.send(allDoctorAppointments);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

AppointmentRouter.patch(
  "/updateAppointment/:id/:userId",
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
      console.log(error);

      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

AppointmentRouter.get(
  "/doctorApointments/:userId",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const { DoctorId, PatientId, appointment_date, appointment_hour } =
        JSON.parse((req.query.where as string) || "{}");

      const where = {
        DoctorId,
        PatientId,
        appointment_date,
        appointment_hour,
      };
      if (!where.DoctorId)
        res.status(403).send({ error: "DoctorId is required" });
      if (!where.PatientId) delete where.PatientId;
      if (!where.appointment_date) delete where.appointment_date;
      if (!where.appointment_hour) delete where.appointment_hour;
      //  if (!where.orderWay) where.orderWay = "ASC";
      const searchAllDoctorAppointments = await filterDoctorAppointments(where);
      res.status(200).send(searchAllDoctorAppointments);
    } catch (error) {
      res.status(500).send({ error: "something went wrong" });
    }
  }
);

/* AppointmentRouter.get(
  "/getDoctorAppointment/:id/:userId",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const allDoctorAppointments = await getDoctorAppointment(+id);
    res.statusCode = 200;
    res.send(allDoctorAppointments);
  }
); */
