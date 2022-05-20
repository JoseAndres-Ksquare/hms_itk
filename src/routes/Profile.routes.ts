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

/* ProfileRouter.put("/softDelete", async (req: Request, res: Response) => {
  const userStatus = await ProfileChangeState(req.body.id, req.body.is_deleted);
  res.statusCode = 200;
  res.send("userStatus changed for the user with id: " + req.body.id);
});
 */
