interface ParseValues {
    height: number,
    weight: number,
}

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height / 100) ** 2;
    switch (true) {
        case bmi < 16.0:
            return 'Underweight (Severe thinness)';
        case bmi >= 16.0 && bmi <= 16.9:
            return 'Underweight (Moderate thinness)';
        case bmi >= 17.0 && bmi <= 18.4:
            return 'Underweight (Mild thinness)';
        case bmi >= 18.5 && bmi <= 24.9:
            return 'Normal range';
        case bmi >= 25.0 && bmi <= 29.9:
            return 'Overweight (Pre-obese)';
        case bmi >= 30.0 && bmi <= 34.9:
            return 'Obese (Class I)';
        case bmi >= 35.0 && bmi <= 39.9:
            return 'Obese (Class II)';
        case bmi >= 40.0:
            return 'Obese (Class III)';
        default:
            return 'Invalid BMI';
    }
};

const parseArgumentsBmi = (argv: string[]): ParseValues => {
    if (argv.length > 4) throw new Error("Too many arguments");
    if (argv.length < 4) throw new Error("Too few arguments");

    if (!isNaN(Number(argv[2])) && !isNaN(Number(argv[3]))) {
        return {
            height: Number(argv[2]),
            weight: Number(argv[3])
        };
    } else throw new Error("Only input numbers (heigh weigth)");
};

const queryArguments = (height: string, weight: string): ParseValues => {
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        return {
            height: Number(height),
            weight: Number(weight)
        };
    } else throw new Error("Only input numbers (heigh weigth)");
};


const Bmi = (h: string, w: string): {weight: number, height: number, bmi: string} | { error: string } => {
    try{
        const { height, weight } = queryArguments(h, w);
        const bmiresult = calculateBmi(height, weight);
        return {
            weight,
            height,
            bmi: bmiresult
        };
    } catch {
        return {error: 'malformated parameters'};
    }
};

if (require.main === module) {
    const { height, weight } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(height, weight));
}

export default Bmi;