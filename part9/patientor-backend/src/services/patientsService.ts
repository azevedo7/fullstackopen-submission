import patients from '../data/patients';
import { Patient, PatientNonSensitiveInfo } from '../types';

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

export default {
    getAll,
    getNonSensitive
};