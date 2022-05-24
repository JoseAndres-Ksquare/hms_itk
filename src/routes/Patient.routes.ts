import { Router, Request, Response } from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
import { paginationPatientAppointments } from "../services/appointment.service";
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

PatientRouter.get(
  "/appointmentPages/:id/:offset/:limit",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    const { id, offset, limit } = req.params;
    const pages = await paginationPatientAppointments(+id, +offset, +limit);
    res.status(200).send({ pages });
  }
);

//SELECT * FROM "Profiles" INNER JOIN "Patients" ON "Profiles".id= "Patients"."ProfileId";
