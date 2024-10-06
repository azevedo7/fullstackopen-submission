import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import { useEffect, useState } from 'react';
import { Patient } from "../../types";

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
        </div>
    );
};

export default PatientDetailsPage;