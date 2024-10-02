import express from 'express';
import { Response } from 'express';
import patientsService from '../services/patientsService';
import { NewPatient, PatientNonSensitiveInfo } from '../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNonSensitiveInfo[]>) => {
    res.send(patientsService.getNonSensitive());
});

router.post('/', (req, res) => {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient); 
    res.json(addedPatient);
});

export default router;