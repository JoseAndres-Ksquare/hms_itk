import { Router, Request, Response } from "express";
import { hasRole } from "../middlewares/hasRole";
import { isAuth } from "../middlewares/isAuthenticated";
import {
  createProfile,
  listProfiles,
  readProfile,
} from "../services/profile.service";

export const ProfileRouter = Router();

ProfileRouter.post(
  "/createProfile/:userId",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const userCreation = await createProfile(
        req.body.first_name,
        req.body.last_name,
        req.body.phone_number,
        req.body.address,
        req.body.user_id
      );
      res.statusCode = 200;
      res.send(userCreation);
    } catch (error) {
      return res.status(500).send({ error: "something went wrong" });
    }
  }
);
ProfileRouter.get(
  "/profiles/:userId",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const profile = await readProfile(userId);
      res.status(200).send(profile);
    } catch (error) {
      res.status(500).send({ error: "something went wrong" });
    }
  }
);

ProfileRouter.get(
  "/listProfiles",
  isAuth,
  hasRole({ roles: ["Admin"], allowSameUser: true }),
  async (req: Request, res: Response) => {
    try {
      const profile = await listProfiles();
      res.status(200).send(profile);
    } catch (error) {
      res.status(500).send({ error: "something went wrong" });
    }
  }
);
