import { Doctor } from "../models/Doctor.model";

export const createDoctor = async (
  medical_speciality: string,
  professional_license: string,
  ProfileId: number
) => {
  try {
    const doctorCreated = await Doctor.create({
      medical_speciality,
      professional_license,
      ProfileId,
    });
    return doctorCreated;
  } catch (error) {
    throw error;
  }
};
