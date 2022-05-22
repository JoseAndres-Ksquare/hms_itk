import { Router, Request, Response } from "express";
import { createUser, disableUser } from "../firebase/methods";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
import { listAppointments } from "../services/appointment.service";

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
  "/activateUser/:userId",
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
  "/list",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: false }),
  async (req: Request, res: Response) => {
    const allAppointments = await listAppointments();
    res.statusCode = 200;
    res.send(allAppointments);
  }
);
