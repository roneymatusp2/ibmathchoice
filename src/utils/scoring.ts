interface Results {
  course: 'AA' | 'AI';
  level: 'HL' | 'SL';
  confidence: number;
  details: {
    focus: string;
    style: string;
    advice: string;
  };
}

export function calculateResults(answers: Record<string, string>): Results {
  let aaScore = 0;
  let aiScore = 0;
  let hlScore = 0;
  let slScore = 0;

  // Calculate scores based on answers
  Object.values(answers).forEach(answer => {
    if (answer.includes('aa_')) aaScore += 2;
    if (answer.includes('ai_')) aiScore += 2;
    if (answer.includes('_hl')) hlScore += 2;
    if (answer.includes('_sl')) slScore += 2;
  });

  // Determine course and level
  const course = aaScore > aiScore ? 'AA' : 'AI';
  const level = hlScore > slScore ? 'HL' : 'SL';

  // Calculate confidence percentage
  const totalQuestions = Object.keys(answers).length;
  const maxPossibleScore = totalQuestions * 2; // Each question can contribute 2 points
  const dominantCourseScore = Math.max(aaScore, aiScore);
  const dominantLevelScore = Math.max(hlScore, slScore);

  // Calculate separate confidences for course and level
  const courseConfidence = (dominantCourseScore / maxPossibleScore) * 100;
  const levelConfidence = (dominantLevelScore / maxPossibleScore) * 100;

  // Overall confidence is the average of course and level confidence
  const confidence = Math.round((courseConfidence + levelConfidence) / 2);

  // Generate detailed feedback
  const details = {
    focus: getFocusDescription(course, level),
    style: getLearningStyleDescription(course, level),
    advice: getAdvice(confidence, course, level, courseConfidence, levelConfidence)
  };

  return { course, level, confidence, details };
}

function getFocusDescription(course: 'AA' | 'AI', level: 'HL' | 'SL'): string {
  if (course === 'AA') {
    return level === 'HL'
      ? 'Strong emphasis on pure mathematics, proofs, and abstract thinking. This course is ideal for future mathematicians, physicists, or engineers who need deep theoretical understanding.'
      : 'Balance of theoretical mathematics with practical applications. Provides a good foundation for STEM fields while maintaining a manageable workload.';
  } else {
    return level === 'HL'
      ? 'Deep dive into real-world applications, modeling, and data analysis. Perfect for future economists, business analysts, or social scientists who need strong applied mathematics skills.'
      : 'Practical approach to mathematics focusing on modeling and technology. Suitable for students needing mathematical literacy in non-STEM fields.';
  }
}

function getLearningStyleDescription(course: 'AA' | 'AI', level: 'HL' | 'SL'): string {
  if (course === 'AA') {
    return level === 'HL'
      ? 'Your responses indicate strong analytical skills and enjoyment in discovering mathematical patterns and proofs. You tend to appreciate the theoretical foundations of mathematics.'
      : 'You show an appreciation for mathematical structure but prefer a more guided approach to learning. This suggests AA SL would provide the right balance of theory and practice.';
  } else {
    return level === 'HL'
      ? 'You excel at connecting mathematics to real-world scenarios and enjoy working with data. Your strength lies in applying mathematical concepts to practical situations.'
      : 'You learn best when mathematics is presented in practical, concrete contexts. AI SL would provide you with useful mathematical tools while maintaining a manageable level of abstraction.';
  }
}

function getAdvice(
  confidence: number,
  course: 'AA' | 'AI',
  level: 'HL' | 'SL',
  courseConfidence: number,
  levelConfidence: number
): string {
  let advice = '';

  if (confidence >= 80) {
    advice = `Your responses strongly indicate that ${course} ${level} aligns well with your interests and abilities. The high confidence level (${confidence}%) suggests this would be an excellent choice for you.`;
  } else if (confidence >= 60) {
    advice = `${course} ${level} appears to be a good fit, but consider discussing this choice with your teachers. `;

    if (courseConfidence > levelConfidence) {
      advice += `While you show a clear preference for ${course} (${Math.round(courseConfidence)}% confidence), you might want to discuss whether ${level} is the right level for you.`;
    } else {
      advice += `While you show a clear preference for ${level} level (${Math.round(levelConfidence)}% confidence), you might want to explore both AA and AI options at this level.`;
    }
  } else {
    advice = 'Your responses show mixed preferences. We recommend discussing your options with your math teacher and academic advisor. Consider factors like:';
    advice += '\n• Your university and career plans';
    advice += '\n• Your comfort with abstract vs. applied mathematics';
    advice += '\n• The time you can dedicate to mathematics study';
  }

  return advice;
}