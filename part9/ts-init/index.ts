import { calculator, Operation } from './calculator';

import express from 'express';
const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.post('/calculate', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value1, value2, op } = req.body;

    // Validate the data here

    // assert the type
    const operation = op as Operation;

    const result = calculator(Number(value1), Number(value2), operation);
    res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});