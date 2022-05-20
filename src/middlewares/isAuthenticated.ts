import { Request, Response } from "express";
import * as admin from "firebase-admin";

export const isAuth = async (req: Request, res: Response, next: Function) => {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    res.status(401);
    return res.send({ error: "Not authorized" });
  }
  //Structure of a token: <Bearer JWToken>
  if (!authorization.startsWith("Bearer")) {
    res.status(401);
    return res.send({ error: "Not authorized" });
  }

  const splittedToken = authorization.split("Bearer ");
  if (splittedToken.length !== 2) {
    res.status(401);
    return res.send({ error: "Not authorized" });
  }
  //cuando se hace el split quedan 2 registros y el segundo(1) es el token
  const token = splittedToken[1];
  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);

    res.locals = {
      ...res.locals,
      email: decodedToken.email,
      uid: decodedToken.uid,
      role: decodedToken.role,
    };
    return next();
  } catch (error) {}
};
