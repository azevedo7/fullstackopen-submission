import express from 'express';
import Bmi from './bmiCalculator';

const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi/', (req, res) => {
    const response = Bmi(req.query.height as string, req.query.weight as string);
    res.json(response);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});