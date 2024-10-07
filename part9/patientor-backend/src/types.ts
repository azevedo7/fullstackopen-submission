import { z } from "zod";
import { newPatientSchema } from "./utils";

export interface Diagnosis {
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

interface BaseEntry{
    id: string,
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Diagnosis['code'][];
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge: {
        date: string,
        criteria: string
    }
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;