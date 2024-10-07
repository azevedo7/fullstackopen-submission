import diagnoses from '../data/diagnoses';

import { Diagnosis } from '../types';

const getAll= () : Diagnosis[] =>{
    return diagnoses;
};

const addDiagnoses = () => {
    return null;
};

export default {
    getAll,
    addDiagnoses
};