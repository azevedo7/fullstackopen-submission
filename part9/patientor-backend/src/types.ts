import { z } from "zod";
import { newPatientSchema } from "./utils";

export interface Diagnoses {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
} 

export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export type PatientNonSensitiveInfo = Omit<Patient, "ssn">;