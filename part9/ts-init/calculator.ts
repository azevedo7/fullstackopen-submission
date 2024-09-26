type Operation =  'multiply' | 'divide' | 'add';

const calculator = (a: number, b: number, op: Operation): number => {
    switch(op) {
        case 'multiply':
            return a * b;
        case 'divide':
            if(b === 0) throw new Error('Cannot divide by zero');
            return a / b;
        case 'add':
            return a + b;
        default:
            throw new Error('Unknown operation');
    }
}

try {
    console.log(calculator(2, 0, 'divide'));
} catch(e: unknown) {
    let errorMessage = "Something went wrong: ";
    if(e instanceof Error) {
        errorMessage += e.message;
    }
    console.log(errorMessage);
}