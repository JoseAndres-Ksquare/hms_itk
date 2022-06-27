import { Patient } from "../models/Patient.model";
import { Profile } from "../models/Profile.model";

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
    throw error;
  }
};

export const fetchPatients = async () => {
  try {
    const allPatients = await Patient.findAll();
    return allPatients;
  } catch (error) {
    throw error;
  }
};

export const fetchPatient = async (id: number) => {
  try {
    const readPatient = await Patient.findAll({ where: { ProfileId: id } });
    return readPatient;
  } catch (error) {
    throw error;
  }
};

export const patientJoin = async (id: number) => {
  try {
    const patientAndProfile = await Patient.findAll({
      where: { ProfileId: id },
      include: [{ model: Profile, required: true }],
    });
    return patientAndProfile;
  } catch (errors) {
    throw errors;
  }
};

export const allPatientsJoin = async () => {
  try {
    const patientsAndProfiles = await Patient.findAll({
      include: [{ model: Profile, required: true }],
    });
    return patientsAndProfiles;
  } catch (errors) {
    throw errors;
  }
};
