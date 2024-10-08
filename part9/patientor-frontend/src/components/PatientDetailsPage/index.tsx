import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { useEffect, useState } from 'react';
import { Diagnosis, Patient } from "../../types";
import Entries from './Entries';
import { TextField, Button, Typography, Select, MenuItem, SelectChangeEvent, Menu } from '@mui/material';
import axios from 'axios';
import { parseDiagnosisCodes } from './helpers';


const PatientDetailsPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    const { id } = useParams();

    useEffect(() => {
        const fetchPatient = async () => {
            if (id) {
                try {
                    const fetchPatient = await patientService.getById(id);
                    setPatient(fetchPatient);
                } catch (e) {
                    console.log(e);
                }
            }
        };

        const fetchDiagnoses = async () => {
            try {
                const fetchDiagnoses = await diagnosesService.getAll();
                setDiagnoses(fetchDiagnoses as Diagnosis[]);
            } catch (e) {
                console.log(e);
            }
        };

        fetchPatient();
        fetchDiagnoses();
    }, [id]);

    if (!patient) {
        return null;
    }

    return (
        <div>
            <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <NewEntryForm patient={patient} diagnoses={diagnoses} />
            <Entries entries={patient.entries} />
        </div>
    );
};

const NewEntryForm = ({ patient, diagnoses }: { patient: Patient, diagnoses: Diagnosis[] }) => {
    const [formData, setFormData] = useState({
        description: '',
        date: '',
        specialist: '',
        healthCheckRating: '',
        diagnosisCodes: [] as string[],
        dischargeDate: '',
        dischargeCriteria: '',
        employerName: '',
        sickLeaveStartDate: '',
        sickLeaveEndDate: '',
    });

    const [type, setType] = useState('HealthCheck');
    const [notification, setNotification] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let formDataToSubmit = {};

        switch (type) {
            case 'HealthCheck':
                formDataToSubmit = {
                    ...formData,
                    type: 'HealthCheck',
                    healthCheckRating: Number(formData.healthCheckRating),
                };
                break;
            case 'OccupationalHealthcare':
                let sickLeave = undefined;
                if (formData.sickLeaveStartDate && formData.sickLeaveEndDate) {
                    sickLeave = {
                        startDate: formData.sickLeaveStartDate,
                        endDate: formData.sickLeaveEndDate
                    };
                }
                formDataToSubmit = {
                    ...formData,
                    type: 'OccupationalHealthcare',
                    sickLeave: sickLeave
                };
                break;
            case 'Hospital':
                formDataToSubmit = {
                    ...formData,
                    type: 'Hospital',
                    discharge: {
                        date: formData.dischargeDate,
                        criteria: formData.dischargeCriteria
                    }
                };
                break;
        }

        // You can add your API call here
        try {
            await patientService.addNewEntry(patient.id, formDataToSubmit);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const message = (e.response?.data?.error[0].message);
                if (message) {
                    setNotification(message);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {notification && <div style={{ color: 'red', border: '1px solid red', padding: '16px' }}>{notification}</div>}
            <Typography variant="h4" gutterBottom>
                New Entry
            </Typography>
            <Select value={type} onChange={(event: SelectChangeEvent) => setType(event.target.value)}>
                <MenuItem value="HealthCheck">Health Check</MenuItem>
                <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
            </Select>
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Specialist"
                name="specialist"
                value={formData.specialist}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            {diagnoses && diagnoses.length > 0 &&
                <Select multiple value={formData.diagnosisCodes} onChange={(event) => {
                    const value = event.target.value as string[];
                    setFormData({
                        ...formData,
                        diagnosisCodes: value 
                    });
                }} fullWidth>
                    {diagnoses.map((diagnosis) => (
                        <MenuItem key={diagnosis.code} value={diagnosis.code}> {diagnosis.code} </MenuItem>
                    ))}
                </Select>
            }

            <TextField
                label="Diagnosis Codes (comma separated)"
                name="diagnosisCodes"
                value={formData.diagnosisCodes}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            {type === 'HealthCheck' && (
                <TextField
                    label="Health Check Rating"
                    name="healthCheckRating"
                    value={formData.healthCheckRating}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />)}

            {type === 'OccupationalHealthcare' && (
                <>
                    <TextField
                        label="Employer Name"
                        name="employerName"
                        value={formData.employerName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Sick Leave Start Date"
                        name="sickLeaveStartDate"
                        type="date"
                        value={formData.sickLeaveStartDate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Sick Leave End Date"
                        name="sickLeaveEndDate"
                        type="date"
                        value={formData.sickLeaveEndDate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </>)}

            {type === 'Hospital' && (
                <>
                    <TextField
                        label="Discharge Date"
                        name="dischargeDate"
                        type="date"
                        value={formData.dischargeDate}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Discharge Criteria"
                        name="dischargeCriteria"
                        value={formData.dischargeCriteria}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"

                    />
                </>
            )}

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                Submit
            </Button>
        </form>
    );
};

export default PatientDetailsPage;