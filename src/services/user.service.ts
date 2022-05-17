import { User } from "../models/User.model";

export const createUser = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  phone_number: string,
  address: string,
  role: string
) => {
  try {
    const userCreated = await User.create({
      first_name,
      last_name,
      email,
      password,
      phone_number,
      address,
      role,
    });
    return userCreated;
  } catch (error) {
    console.error(error);
  }
};

export const userChangeState = async (id: number, is_deleted: boolean) => {
  try {
    const userStatus = await User.update(
      {
        is_deleted: is_deleted,
      },
      { where: { id: id } }
    );
    return userStatus;
  } catch (error) {
    console.error(error);
  }
};
