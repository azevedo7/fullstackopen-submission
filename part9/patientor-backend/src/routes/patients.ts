import express, { NextFunction } from 'express';
import { Response, Request } from 'express';
import patientsService from '../services/patientsService';
import { NewPatientEntry, Patient, NonSensitivePatient, EntryWithoutId } from '../types';
import { newPatientSchema, EntryWithoutIdSchema } from '../utils';
import { ZodError } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitive());
});

router.get('/:id', (req: Request, res: Response<Patient>) => {
  const patient = patientsService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  }
  res.status(404);
});

// Parser middleware
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    EntryWithoutIdSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedPatient = patientsService.addPatient(req.body);
  res.json(addedPatient);
});

type EntryParams = {
  id: string;
};

router.post('/:id/entries', newEntryParser, (req: Request<EntryParams, unknown, EntryWithoutId>, res: Response<Patient>) => {
  const addedEntry = patientsService.addEntry(req.body, req.params.id);
  res.json(addedEntry);
});

router.use(errorMiddleware);
export default router;