import diagnoses from '../data/diagnoses';

import { Diagnoses } from '../types';

const getAll= () : Diagnoses[] =>{
    return diagnoses;
};

const addDiagnoses = () => {
    return null;
};

export default {
    getAll,
    addDiagnoses
};