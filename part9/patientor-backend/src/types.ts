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
    ssn: string,
    occupation: string,
    gender: Gender,
    dateOfBirth: string,
    entries: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
} 

export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export type PatientNonSensitiveInfo = Omit<Patient, "ssn">;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry{
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;