import { Router, Request, Response } from "express";
import { createUser, userChangeState } from "../services/user.service";

export const UserRouter = Router();

UserRouter.post("/createUser", async (req: Request, res: Response) => {
  const userCreation = await createUser(
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.password,
    req.body.phone_number,
    req.body.address,
    "Patient"
  );
  res.statusCode = 200;
  res.send(userCreation);
});

UserRouter.put("/softDelete", async (req: Request, res: Response) => {
  const userStatus = await userChangeState(req.body.id, req.body.is_deleted);
  res.statusCode = 200;
  res.send("userStatus changed for the user with id: " + req.body.id);
});
