import axios from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addNewEntry = async(id: string, entry: object) => {
  const newEntry = {...entry, type:"HealthCheck"};
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    newEntry, 
  );
  return data;
};

export default {
  getAll, create, getById, addNewEntry
};

