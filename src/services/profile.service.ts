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
