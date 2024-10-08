import patients from '../data/patients';
import { NewPatientEntry, Patient, NonSensitivePatient, EntryWithoutId} from '../types';
import { v1 as uuid } from 'uuid';

const getAll = () : Patient[] => {
    return patients;
};

const getNonSensitive = () : NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (newPatient: NewPatientEntry) : Patient => {
    const id = uuid();

    const patient: Patient = {
        id,
        entries: [],
        ...newPatient
    };

    patients.push(patient);
    return patient;
};

const addEntry = (newEntry: EntryWithoutId, patientId: string) : Patient => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        const entry = {
            id: uuid(),
            ...newEntry
        };
        patients.find(p => p.id === patientId)?.entries.push(entry);
        return patient;
    }
    throw new Error('Patient not found');
};

const findById = (id: string) : Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

export default {
    getAll,
    getNonSensitive,
    addPatient,
    addEntry,
    findById
};