import * as admin from "firebase-admin";
import { Role } from "../types";

export const createUser = async (
  email: string,
  password: string,
  role: Role,
  isDisabled: boolean
) => {
  const { uid } = await admin.auth().createUser({
    email: email,
    password: password,
  });
  await admin.auth().setCustomUserClaims(uid, { role, isDisabled });
  return uid;
};

const mapToUser = (user: admin.auth.UserRecord) => {
  const customClaims = (user.customClaims || { role: "" }) as { role?: string };
  const role = customClaims.role ? customClaims.role : "";

  return {
    uid: user.uid,
    email: user.email,
    role,
    isDisabled: user.disabled,
  };
};

/* export const readUser = async (userId: string) => {
  const user = await admin.auth().getUser(userId);

  return mapToUser(user);
}; */

/* export const getInfo = async (idToken: string) => {
  const info = await admin.auth().verifyIdToken(idToken);
  return info;
}; */

export const disableUser = async (uid: string, disabled: boolean) => {
  const user = await admin.auth().updateUser(uid, { disabled });

  return mapToUser(user);
};
