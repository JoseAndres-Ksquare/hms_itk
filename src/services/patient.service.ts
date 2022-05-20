import { Patient } from "../models/Patient.model";

export const createPatient = async (
  birth_date: Date,
  age: string,
  blood_type: string,
  alergies: string,
  gender: string,
  ProfileId: number
) => {
  try {
    const patientCreated = await Patient.create({
      birth_date,
      age,
      blood_type,
      alergies,
      gender,
      ProfileId,
    });
    return patientCreated;
  } catch (error) {
    console.error(error);
  }
};
