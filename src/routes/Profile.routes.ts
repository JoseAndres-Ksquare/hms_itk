import { Router, Request, Response } from "express";
import { createProfile } from "../services/profile.service";

export const ProfileRouter = Router();

ProfileRouter.post("/createProfile", async (req: Request, res: Response) => {
  const userCreation = await createProfile(
    req.body.first_name,
    req.body.last_name,
    req.body.phone_number,
    req.body.address,
    req.body.user_id
  );
  res.statusCode = 200;
  res.send(userCreation);
});
