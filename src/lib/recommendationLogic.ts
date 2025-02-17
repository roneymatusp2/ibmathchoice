// src/lib/recommendationLogic.ts

// --- Type Definitions ---

// Defines the possible courses (AA or AI)
enum Course {
    AA = 'AA',
    AI = 'AI',
}

// Defines the possible levels (HL or SL)
enum Level {
    HL = 'HL',
    SL = 'SL',
}

// Interface for the recommendation results
interface Results {
    course: Course;
    level: Level;
    confidence: number; // Overall confidence (0-100)
    courseConfidence: number; // Confidence in the course choice
    levelConfidence: number; // Confidence in the level choice
    details: {
        focus: string;
        style: string;
        advice: string;
    };
}

// Interface for a question option (already defined in questions.ts, but repeated here for clarity)
interface Option {
    value: string;
    label: string;
}

// Interface for a question (already defined in questions.ts, but repeated here for clarity)
interface Question {
    id: string;
    text: string;
    options: Option[];
}

// --- Question Weights (Adjust these values!) ---

// Defines the weight of each question for the COURSE choice (AA vs. AI)
const courseQuestionWeights: Record<string, number> = {
    career_field1: 2,
    career_path1: 2,
    career_math_role1: 2,
    career_motivation1: 1,
    career_university1: 2,
    interest1: 2,
    interest2: 2,
    interest3: 2,
    interest4: 1,
    interest5: 1,
    skill1: 1,
    skill2: 1,
    skill3: 2,
    skill4: 1,
    skill5: 1,
    learning1: 1,
    learning2: 1,
    learning3: 2,
    learning4: 1,
    learning5: 1,
    future1: 2,
    future2: 2,
    future3: 2,
    future4: 1,
    future5: 1,
};

// Defines the weight of each question for the LEVEL choice (HL vs. SL)
const levelQuestionWeights: Record<string, number> = {
    career_field1: 1,
    career_path1: 1,
    career_math_role1: 2,
    career_motivation1: 2,
    career_university1: 2,
    interest1: 2,
    interest2: 1,
    interest3: 1,
    interest4: 2,
    interest5: 2,
    skill1: 2,
    skill2: 2,
    skill3: 1,
    skill4: 2,
    skill5: 2,
    learning1: 2,
    learning2: 2,
    learning3: 1,
    learning4: 2,
    learning5: 2,
    future1: 3,
    future2: 2,
    future3: 2,
    future4: 1,
    future5: 2,
};



// --- Main Function: calculateResults ---

export function calculateResults(answers: Record<string, string>): Results {
    let aaScore = 0;
    let aiScore = 0;
    let hlScore = 0;
    let slScore = 0;
    let answeredCount = 0; // Number of questions answered

    // Iterate over the student's answers
    for (const questionId in answers) {
        if (answers.hasOwnProperty(questionId)) {
            const answer = answers[questionId];
            answeredCount++;

            // Extract the relevant parts of the answer 'value' (e.g., 'aa_hl')
            const [coursePart, levelPart] = answer.split('_');

            // Update the scores based on the question weights
            if (coursePart === 'aa') {
                aaScore += courseQuestionWeights[questionId] || 0; // Use weight or 0 if not defined
            } else if (coursePart === 'ai') {
                aiScore += courseQuestionWeights[questionId] || 0;
            }

            if (levelPart === 'hl') {
                hlScore += levelQuestionWeights[questionId] || 0;
            } else if (levelPart === 'sl') {
                slScore += levelQuestionWeights[questionId] || 0;
            }
        }
    }

    // Calculate the maximum possible score (considering the weights)
    const maxPossibleCourseScore = Object.values(courseQuestionWeights).reduce((sum, weight) => sum + weight, 0);
    const maxPossibleLevelScore = Object.values(levelQuestionWeights).reduce((sum, weight) => sum + weight, 0);

    // Determine the course and level based on the scores
    const course = aaScore >= aiScore ? Course.AA : Course.AI;
    const level = hlScore >= slScore ? Level.HL : Level.SL;

    // Calculate the course confidence (0-100) - Proportion of the maximum score
    const courseConfidence = maxPossibleCourseScore > 0 ? Math.round((Math.max(aaScore, aiScore) / maxPossibleCourseScore) * 100) : 0;

    // Calculate the level confidence (0-100)
    const levelConfidence = maxPossibleLevelScore > 0 ? Math.round((Math.max(hlScore, slScore) / maxPossibleLevelScore) * 100) : 0;

    // Adjust confidence based on the number of questions answered.
    const totalQuestions = Object.keys(courseQuestionWeights).length; // Assumes all weights are defined
    const answeredRatio = answeredCount / totalQuestions;
    const adjustedCourseConfidence = Math.round(courseConfidence * answeredRatio);
    const adjustedLevelConfidence = Math.round(levelConfidence * answeredRatio);

    // Overall confidence is the minimum between course and level confidence
    const confidence = Math.min(adjustedCourseConfidence, adjustedLevelConfidence);

    // Generate the feedback details
    const details = {
        focus: getFocusDescription(course, level),
        style: getLearningStyleDescription(course, level),
        advice: getAdvice(confidence, course, level, courseConfidence, levelConfidence),
    };

    return { course, level, confidence, courseConfidence: adjustedCourseConfidence, levelConfidence: adjustedLevelConfidence, details };
}


// --- Feedback Functions (now with 'switch' for clarity) ---

function getFocusDescription(course: Course, level: Level): string {
    switch (course) {
        case Course.AA:
            switch (level) {
                case Level.HL:
                    return 'Strong emphasis on pure mathematics, proofs, and abstract thinking. This course is ideal for future mathematicians, physicists, or engineers who need a deep theoretical understanding.';
                case Level.SL:
                    return 'Balance of theoretical mathematics with practical applications. Provides a good foundation for STEM fields while maintaining a manageable workload.';
            }
        case Course.AI:
            switch (level) {
                case Level.HL:
                    return 'Deep dive into real-world applications, modelling, and data analysis. Perfect for future economists, business analysts, or social scientists who need strong applied mathematics skills.';
                case Level.SL:
                    return 'Practical approach to mathematics focusing on modelling and technology. Suitable for students needing mathematical literacy in non-STEM fields.';
            }
    }
}

function getLearningStyleDescription(course: Course, level: Level): string {
    switch (course) {
        case Course.AA:
            switch (level) {
                case Level.HL:
                    return 'Your responses indicate strong analytical skills and enjoyment in discovering mathematical patterns and proofs. You tend to appreciate the theoretical foundations of mathematics.';
                case Level.SL:
                    return 'You show an appreciation for mathematical structure but prefer a more guided approach to learning. This suggests AA SL would provide the right balance of theory and practice.';
            }
        case Course.AI:
            switch (level) {
                case Level.HL:
                    return 'You excel at connecting mathematics to real-world scenarios and enjoy working with data. Your strength lies in applying mathematical concepts to practical situations.';
                case Level.SL:
                    return 'You learn best when mathematics is presented in practical, concrete contexts. AI SL would provide you with useful mathematical tools while maintaining a manageable level of abstraction.';
            }
    }
}

function getAdvice(
    confidence: number,
    course: Course,
    level: Level,
    courseConfidence: number, // Confidence in the course
    levelConfidence: number  // Confidence in the level
): string {
    let advice = '';

    if (confidence >= 80) {
        advice = `Your responses strongly indicate that ${course} ${level} aligns well with your interests and abilities. The high overall confidence (${confidence}%) suggests this would be an excellent choice.`;
    } else if (confidence >= 60) {
        advice = `${course} ${level} appears to be a good fit, but consider discussing this choice with your teachers.`;

        if (courseConfidence > levelConfidence) {
            advice += ` You show a clearer preference for ${course} (confidence of ${Math.round(courseConfidence)}%), but it would be good to discuss whether ${level} is the right level for you.`;
        } else {
            advice += ` You show a clearer preference for the ${level} level (confidence of ${Math.round(levelConfidence)}%), but it would be good to explore both AA and AI options.`;
        }
    } else {
        advice =
            'Your responses show mixed preferences or are still developing. We strongly recommend that you talk to your maths teacher and/or careers advisor to discuss your options in detail. Consider factors such as:\n\n' +
            '• Your university and career plans.\n' +
            '• Your comfort with abstract vs. applied mathematics.\n' +
            '• The amount of time you are willing to dedicate to studying mathematics.';
    }

    return advice;
}