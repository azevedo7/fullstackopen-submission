import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import { useEffect, useState } from 'react';
import { Patient } from "../../types";
import Entries from './Entries';
import { TextField, Button, Typography } from '@mui/material';


const PatientDetailsPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const { id } = useParams();

    useEffect(() => {
        const fetchPatient = async () => {
            if(id) {
                try{
                    const fetchPatient = await patientService.getById(id);
                    setPatient(fetchPatient); 
                } catch (e) {
                    console.log(e);
                }
            }
        };

        fetchPatient();
    }, [id]);

    if(!patient) {
        return null;
    }

    return (
        <div>
            <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}</h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <NewEntryForm patient={patient} />
            <Entries entries={patient.entries} />
        </div>
    );
};

const NewEntryForm = ({patient}: {patient: Patient}) => {
    const [formData, setFormData] = useState({
    description: '',
    date: '',
    specialist: '',
    healthCheckRating: '',
    diagnosisCodes: '',
  });

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
    

    const formDataToSubmit = {
        ...formData,
        healthCheckRating: Number(formData.healthCheckRating),
        diagnosisCodes: formData.diagnosisCodes.split(',').map(code => code.trim()),
    };
    // You can add your API call here
    try{
        await patientService.addNewEntry(patient.id, formDataToSubmit);
    } catch (e) {
        const message = (e.response.data?.error[0].message);
        if(message){
            setNotification(message);
        }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    {notification && <div style={{ color: 'red', border: 'solid', padding: 10, borderWidth: 1 }}>{notification}</div>}
      <Typography variant="h4" gutterBottom>
        New Healthcare Entry
      </Typography>
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
      <TextField
        label="Health Check Rating"
        name="healthCheckRating"
        value={formData.healthCheckRating}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Diagnosis Codes (comma separated)"
        name="diagnosisCodes"
        value={formData.diagnosisCodes}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Submit
      </Button>
    </form>
  );  
};

export default PatientDetailsPage;