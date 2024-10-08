import { NewPatientEntry, Gender, HealthCheckRating, EntryWithoutId } from './types';
import { z } from 'zod';

export const toNewPatient = (object: unknown): NewPatientEntry => {
    return newPatientSchema.parse(object);
};

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});

const HealthCheckRatingSchema = z.nativeEnum(HealthCheckRating);

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

// HealthCheckEntry schema
const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingSchema,
});

// OccupationalHealthcareEntry schema
const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
});

// HospitalEntry schema
const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

// Combine all entry schemas
export const EntryWithoutIdSchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);


export function parseEntryData(data: unknown): EntryWithoutId {
  const result = EntryWithoutIdSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid entry data: " + result.error.message);
  }
  return result.data;
}