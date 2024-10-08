import { useState, useEffect } from 'react';
import diagnosesService from '../../services/diagnoses';
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../../types';
import { assertNever } from './helpers';
import HeartIcon from '@mui/icons-material/Favorite';
import HospitalCheckIcon from '@mui/icons-material/MedicalServices';
import OccupationalIcon from '@mui/icons-material/MonitorHeart';


const Entries = ({ entries }: { entries: Entry[] }) =>{
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

    useEffect(() => {
        const fetchDiagnoses = async () => {
            try{
                const fetchDiagnoses = await diagnosesService
                    .getAll();

                setDiagnoses(fetchDiagnoses);
            } catch(e){
                console.log(e);
            }
        };

        fetchDiagnoses();
    }, []);

    if(!entries || entries.length === 0) {
        return null;
    }

    return (
        <div>
            <h3>entries</h3>
            {entries.map(entry => (
                <div style={{ border: '1px solid black', borderRadius: '10px', padding: '10px', marginBottom: '10px' }} key={entry.id}>
                    <EntryDetails entry={entry} />
                </div>
            ))}
        </div>
    );
};

const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }: { entry: Entry }) => {
    switch(entry.type) {
        case "Hospital": return <Hospital entry={entry}/>;
        case "OccupationalHealthcare": return <OccupationalHealthcare entry={entry}/>;
        case "HealthCheck": return <HealthCheck entry={entry}/>;
        default: return assertNever(entry);
    }
};

const Hospital = ({ entry }: { entry: Entry }) => {
    const { discharge } = entry as HospitalEntry;
    return (
        <div>
            <p>{entry.date} <HospitalCheckIcon /></p>
            <p>discharge date: {discharge.date} {discharge.criteria}</p>
            <p>{entry.description}</p>
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

const OccupationalHealthcare = ({ entry }: { entry: Entry }) => {
    const { employerName }= entry as OccupationalHealthcareEntry;
    return (
        <div>
            <p>{entry.date}  {employerName} </p>
            <p>{entry.description}</p>
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

const HealthCheck = ({ entry }: { entry: Entry }) => {
    const { healthCheckRating }= entry as HealthCheckEntry;
    let color;
    switch(healthCheckRating) {
        case 0: color = "green"; break;
        case 1: color = "yellow"; break;
        case 2: color = "orange"; break;
        case 3: color = "red"; break;
    }
    return (
        <div>
            <p>{entry.date} <OccupationalIcon /></p>
            <p><HeartIcon style={{ color: color }}/></p>
            <p>{entry.description}</p>
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

export default Entries;