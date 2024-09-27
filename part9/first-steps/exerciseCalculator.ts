interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

interface Values {
    days: number[],
    target: number
}

const calculateExercises = (days: number[], target: number): Result => {
    const total = days.reduce((acc, curr) => acc + curr);
    const periodLength = days.length;
    const trainingDays = days.filter(val => val !== 0).length;
    const average = total/periodLength;

    let rating = 2;
    let ratingDescription = 'good';
    if(average < target * 0.8) {
        rating = 1;
        ratingDescription = 'bad';
    } else if (average > target * 1.2) {
        rating = 3;
        ratingDescription = 'excellent';
    }
    
    return {
        periodLength,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average,
    }
}

// $ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
// argv[3] argv[argv.length-1]
// argv.length > 4

const parseArguments = (args: string[]): Values => {
    if(args.length < 4) throw new Error("Too few arguments");
    const target = Number(process.argv[2]);
    let days = [];
    for(let i = 3; i < process.argv.length; i++) {
        days.push(Number(process.argv[i]))
    }
    if(!isNaN(target) && !days.includes(NaN)){
        return {
            days,
            target
        }
    } else {
        throw new Error("Provided arguments were not numbers")
    }
} 

try{
    const { days, target } = parseArguments(process.argv)
    console.log(calculateExercises(days, target));
} catch(e: unknown) {
    let errorMessage = "Something went wrong: ";
    if(e instanceof Error) {
        errorMessage += "Error: " + e;
    }
    console.log(errorMessage);
}