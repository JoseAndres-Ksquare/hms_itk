import { Doctor } from "../models/Doctor.model";
import { Profile } from "../models/Profile.model";

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

export const fetchDoctor = async (id: number) => {
  try {
    const readDoctor = await Doctor.findAll({ where: { ProfileId: id } });
    return readDoctor;
  } catch (error) {
    throw error;
  }
};

export const fetchDoctors = async () => {
  try {
    const allDoctors = await Doctor.findAll();
    return allDoctors;
  } catch (error) {
    throw error;
  }
};

export const doctorJoin = async (id: number) => {
  try {
    const doctorAndProfile = await Doctor.findAll({
      where: { ProfileId: id },
      include: [{ model: Profile, required: true }],
    });
    return doctorAndProfile;
  } catch (errors) {
    throw errors;
  }
};

export const allDoctorsJoin = async () => {
  try {
    const doctorsAndProfiles = await Doctor.findAll({
      include: [{ model: Profile, required: true }],
    });
    return doctorsAndProfiles;
  } catch (errors) {
    throw errors;
  }
};
