import { Router, Request, Response } from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
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
