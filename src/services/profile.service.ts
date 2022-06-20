import { where } from "sequelize/types";
import { Profile } from "../models/Profile.model";

export const createProfile = async (
  first_name: string,
  last_name: string,
  phone_number: string,
  address: string,
  user_id: string
) => {
  try {
    const userCreated = await Profile.create({
      first_name,
      last_name,
      phone_number,
      address,
      user_id,
    });
    return userCreated;
  } catch (error) {
    console.error(error);
  }
};

export const readProfile = async (userId: string) => {
  try {
    const profile = await Profile.findAll({ where: { user_id: userId } });
    return profile;
  } catch (error) {
    throw error;
  }
};

export const listProfiles = async () => {
  try {
    const profile = await Profile.findAll();
    return profile;
  } catch (error) {
    throw error;
  }
};
