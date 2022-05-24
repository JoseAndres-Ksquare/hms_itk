import { Router, Request, Response } from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
import { paginationDoctorAppointments } from "../services/appointment.service";
import { createDoctor } from "../services/doctor.service";

export const DoctorRouter = Router();

DoctorRouter.post(
  "/createDoctor",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: false }),
  async (req: Request, res: Response) => {
    const patient = await createDoctor(
      req.body.medical_speciality,
      req.body.professional_license,
      req.body.ProfileId
    );
    res.statusCode = 200;
    res.send(patient);
  }
);

DoctorRouter.get(
  "/appointmentPages/:id/:offset/:limit",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    const { id, offset, limit } = req.params;
    const pages = await paginationDoctorAppointments(+id, +offset, +limit);
    res.status(200).send({ pages });
  }
);
