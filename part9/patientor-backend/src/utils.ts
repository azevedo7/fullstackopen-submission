import { NewPatient, Gender } from './types';

export const toNewPatient = (object: unknown): NewPatient => {
    if(!object || typeof(object) !== 'object'){
        throw new Error('Incorrect or missing data');
    };

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object
       && 'gender' in object && 'occupation' in object 
    ){
        const newPatient: NewPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
        };

        return newPatient;
    }

    throw new Error('Some fields are missing');
};

const parseString = (text: unknown): string => {
    if(!text || !isString(text)){
        throw new Error('An element is not string');
    }
    return text;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error('Invalid date');
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)){
        throw new Error('Invalid gender');
    }
    return gender;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(gender);
};