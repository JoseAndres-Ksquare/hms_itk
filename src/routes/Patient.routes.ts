import { Router, Request, Response } from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
import { createPatient } from "../services/patient.service";

export const PatientRouter = Router();

PatientRouter.post(
  "/createPatient",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    if (
      !req.body.birth_date ||
      !req.body.age ||
      !req.body.blood_type ||
      !req.body.alergies ||
      !req.body.gender ||
      !req.body.ProfileId
    ) {
      res.status(400);
      return res.send({ error: "All fields are required" });
    }
    const patient = await createPatient(
      req.body.birth_date,
      req.body.age,
      req.body.blood_type,
      req.body.alergies,
      req.body.gender,
      req.body.ProfileId
    );
    res.statusCode = 200;
    res.send(patient);
  }
);
//SELECT * FROM "Profiles" INNER JOIN "Patients" ON "Profiles".id= "Patients"."ProfileId";
