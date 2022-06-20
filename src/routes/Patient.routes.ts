import { Router, Request, Response } from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
import { paginationPatientAppointments } from "../services/appointment.service";
import { createPatient, fetchPatients } from "../services/patient.service";

export const PatientRouter = Router();

PatientRouter.post(
  "/createPatient/:userId",
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
    try {
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
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

PatientRouter.get(
  "/appointmentPages/:id/:userId/:offset/:limit",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const { id, offset, limit } = req.params;
      const pages = await paginationPatientAppointments(+id, +offset, +limit);
      res.status(200).send({ pages });
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

PatientRouter.get(
  "/allpatients",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const patients = await fetchPatients();
      res.status(200).send(patients);
    } catch (error) {
      console.log(error);
    }
  }
);

//SELECT * FROM "Profiles" INNER JOIN "Patients" ON "Profiles".id= "Patients"."ProfileId";
