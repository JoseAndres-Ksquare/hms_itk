import { Router, Request, Response } from "express";
import { createUser, disableUser } from "../firebase/methods";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
import {
  DoctorAppointmentsAdmin,
  listAppointments,
  listFinishedAppointments,
} from "../services/appointment.service";

export const AdminRouter = Router();

AdminRouter.post(
  "/createrDoctor",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: false }),
  async (req: Request, res: Response) => {
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
      const userDoctorId = await createUser(email, password, role, false);
      res.status(201).send({
        userDoctorId,
      });
    } catch (error) {
      res.status(500).send({ error: "something went wrong" });
    }
  }
);

AdminRouter.patch(
  "/activateUser",
  isAuth,
  hasRole({
    roles: ["Admin"],
    allowSameUser: false,
  }),
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await disableUser(userId, false);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

AdminRouter.get(
  "/listAppointments",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: false }),
  async (req: Request, res: Response) => {
    try {
      const allAppointments = await listAppointments();
      res.statusCode = 200;
      res.send(allAppointments);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

AdminRouter.get(
  "/listFinishedAppointments/:status",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: false }),
  async (req: Request, res: Response) => {
    const { status } = req.params;
    try {
      const allFinishedAppointments = await listFinishedAppointments(status);
      res.statusCode = 200;
      res.send(allFinishedAppointments);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

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
AdminRouter.get(
  "/filterAppointments",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: false }),
  async (req: Request, res: Response) => {
    try {
      const { DoctorId, PatientId, status } = JSON.parse(
        (req.query.where as string) || "{}"
      );

      const where = {
        DoctorId,
        PatientId,
        status,
      };

      (Object.keys(where) as (keyof typeof where)[]).forEach((key) => {
        where[key] === undefined ? delete where[key] : {};
      });

      const searchAllDoctorAppointments = await DoctorAppointmentsAdmin(where);
      res.status(200).send(searchAllDoctorAppointments);
    } catch (error) {
      res.status(500).send({ error: "something went wrong" });
    }
  }
);
