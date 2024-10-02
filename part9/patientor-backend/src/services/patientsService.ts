import patients from '../data/patients';
import { NewPatient, Patient, PatientNonSensitiveInfo } from '../types';
import { v1 as uuid } from 'uuid';

const getAll = () : Patient[] => {
    return patients;
};

const getNonSensitive = () : PatientNonSensitiveInfo[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (newPatient: NewPatient) : Patient => {
    const id = uuid();

    const patient: Patient = {
        id,
        ...newPatient
    };

    patients.push(patient);
    return patient;
};

export default {
    getAll,
    getNonSensitive,
    addPatient
};