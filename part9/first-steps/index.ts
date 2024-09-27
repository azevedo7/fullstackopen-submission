import express from 'express';
import Bmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi/', (req, res) => {
    const response = Bmi(req.query.height as string, req.query.weight as string);
    res.json(response);
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if(daily_exercises == undefined || target == undefined){
        res.json({ error: "parameters missing" });
        return;
    }

    if(!Array.isArray(daily_exercises)) {
        res.json({ error: "malformateted parameters"});
        return;
    }

    // check if all elements in daily_exercises are numbers
    const allNumbers = daily_exercises.every(exercise => typeof exercise === 'number');
    
    if(!allNumbers || typeof target !== 'number'){
        res.json({ error: "malformatted parameters "});
        return;
    }

    const response = calculateExercises(daily_exercises, target);
    res.send(response);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});