import express from 'express';
import { Response } from 'express';
import patientsService from '../services/patientsService';
import { PatientNonSensitiveInfo } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<PatientNonSensitiveInfo[]>) => {
    res.send(patientsService.getNonSensitive());
});

export default router;