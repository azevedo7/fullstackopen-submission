import { NewPatientEntry, Gender } from './types';
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
