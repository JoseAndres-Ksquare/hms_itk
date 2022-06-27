import { Router, Request, Response } from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
import { paginationDoctorAppointments } from "../services/appointment.service";
import {
  createDoctor,
  doctorJoin,
  fetchDoctor,
  fetchDoctors,
} from "../services/doctor.service";
import { fetchPatient } from "../services/patient.service";

export const DoctorRouter = Router();

DoctorRouter.post(
  "/createDoctor/:userId",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const patient = await createDoctor(
        req.body.medical_speciality,
        req.body.professional_license,
        req.body.ProfileId
      );
      res.statusCode = 200;
      res.send(patient);
    } catch (error) {
      console.log(error);

      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

DoctorRouter.get(
  "/appointmentPages/:id/:offset/:limit",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const { id, offset, limit } = req.params;
      const pages = await paginationDoctorAppointments(+id, +offset, +limit);
      res.status(200).send({ pages });
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);

DoctorRouter.get(
  "/readDoctor/:id/:userId",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const doctor = await fetchDoctor(+id);
      res.status(200).send(doctor);
    } catch (error) {
      console.log(error);
    }
  }
);

/* DoctorRouter.get(
  "/alldoctors",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: false }),
  async (req: Request, res: Response) => {
    try {
      const doctors = await fetchDoctors();
      res.status(200).send(doctors);
    } catch (error) {
      console.log(error);
    }
  }
); */

DoctorRouter.get(
  "/doctorAndProfile/:id/:userId",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const patients = await doctorJoin(+id);
      res.status(200).send(patients);
    } catch (error) {
      console.log(error);
    }
  }
);
