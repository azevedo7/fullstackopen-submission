interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 5));