import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import { useEffect, useState } from 'react';
import { Patient, Entry } from "../../types";

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
            <Entries entries={patient.entries} />
        </div>
    );
};

const Entries = ({ entries }: { entries: Entry[] }) =>{
    if(!entries || entries.length === 0) {
        return null;
    }

    return (
        <div>
            <h3>entries</h3>
            {entries.map(entry => (
                <div>
                    <p>{entry.date} {entry.description}</p>
                    <ul>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>
                                {code}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
};

export default PatientDetailsPage;