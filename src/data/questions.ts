export type Option = {
  value: string;
  label: string;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
};

export const questions: Question[] = [
  // Section A: Career & Future Path (New Section)
  {
    id: 'career_field1',
    text: 'Which academic fields are you most drawn to?',
    options: [
      { value: 'aa_hl', label: 'Science, Engineering, Architecture, Mathematics – I enjoy technical and logical problem-solving' },
      { value: 'aa_sl', label: 'Journalism, Public Relations, History, Philosophy – I prefer working with ideas, concepts, and communication' },
      { value: 'ai_hl', label: 'Business, Economics, Accounting, Finance – I like data analysis, financial models, and real-world applications' },
      { value: 'ai_sl', label: 'Arts, Design, Literature, Creative Writing – I thrive in creative and expressive fields' }
    ]
  },
  {
    id: 'career_path1',
    text: 'Which career path most closely aligns with your goals?',
    options: [
      { value: 'aa_hl', label: 'Engineering, Architecture, Physics – I see myself in a highly technical, problem-solving role' },
      { value: 'aa_sl', label: 'Media, Law, Public Policy – I enjoy working with analysis, discussion, and complex arguments' },
      { value: 'ai_hl', label: 'Business, Finance, Data Science – I like working with numbers, statistics, and market trends' },
      { value: 'ai_sl', label: 'Arts, Design, Creative Industries – I want to focus on visual, literary, or conceptual creativity' }
    ]
  },
  {
    id: 'career_math_role1',
    text: 'What role do you see mathematics playing in your future studies or career?',
    options: [
      { value: 'aa_hl', label: 'A major role – I expect to use advanced mathematics regularly in my studies and profession' },
      { value: 'ai_hl', label: 'A supporting role – I will use mathematics, but not as the main focus of my field' },
      { value: 'aa_sl', label: 'A minor role – I will need some applied mathematics, but nothing too theoretical' },
      { value: 'ai_sl', label: "Very little – I don't anticipate using mathematics extensively in my career" }
    ]
  },
  {
    id: 'career_motivation1',
    text: 'What is your main reason for choosing a mathematics course in the IB?',
    options: [
      { value: 'aa_hl', label: 'It is essential for my future university program (e.g., engineering, physics, data science)' },
      { value: 'ai_hl', label: 'I enjoy mathematics and want to explore it at a deeper level' },
      { value: 'aa_sl', label: 'It is required for my IB diploma or as a general university prerequisite' },
      { value: 'ai_sl', label: 'I am taking it because I feel I should, due to teacher/parent expectations' }
    ]
  },
  {
    id: 'career_university1',
    text: 'What general direction are you considering for your university studies?',
    options: [
      { value: 'aa_hl', label: 'A technical/scientific field (engineering, computer science, physics, etc.)' },
      { value: 'aa_sl', label: 'A social sciences or humanities field (law, psychology, philosophy, international relations)' },
      { value: 'ai_hl', label: 'A business or finance-related field (economics, management, accounting, actuarial science)' },
      { value: 'ai_sl', label: 'A creative or design-oriented field (architecture, arts, media, communications)' }
    ]
  },
  // Section B: Interest & Enjoyment (Original Section)
  {
    id: 'interest1',
    text: 'How would you describe your general attitude toward math?',
    options: [
      { value: 'aa_hl', label: 'I find math fascinating and often do extra math activities on my own' },
      { value: 'ai_hl', label: 'I like math if I can see a practical use for it' },
      { value: 'aa_sl', label: "It's a necessary subject; I don't dislike it, but I'm not excited either" },
      { value: 'ai_sl', label: 'I find math challenging or uninteresting and do it mainly because I have to' }
    ]
  },
  {
    id: 'interest2',
    text: 'When learning a new concept, which approach sounds more appealing?',
    options: [
      { value: 'aa_hl', label: 'Exploring the proofs/theory behind it (the "why")' },
      { value: 'ai_hl', label: 'Seeing how to apply it in real-world situations (the "how")' },
      { value: 'aa_sl', label: 'Learning just enough steps to solve the problems given' },
      { value: 'ai_sl', label: "I'm not sure; I tend to just follow instructions" }
    ]
  },
  {
    id: 'interest3',
    text: 'Which type of problem do you find more rewarding to solve?',
    options: [
      { value: 'aa_hl', label: "A puzzle with an elegant, purely mathematical solution—even if it's abstract" },
      { value: 'ai_hl', label: 'A challenge where you use data or real examples to model a situation' },
      { value: 'aa_sl', label: "I don't strongly prefer one type over the other" },
      { value: 'ai_sl', label: 'Problems that have straightforward methods, so I can get answers quickly' }
    ]
  },
  {
    id: 'interest4',
    text: 'In your previous math classes, what did you most enjoy?',
    options: [
      { value: 'aa_hl', label: 'Algebraic derivations, proofs, or advanced problem sets (e.g., math competitions)' },
      { value: 'ai_hl', label: 'Projects that involved gathering data and analyzing it with math' },
      { value: 'aa_sl', label: 'Clear explanations followed by practice exercises' },
      { value: 'ai_sl', label: "I didn't particularly enjoy any specific aspect" }
    ]
  },
  {
    id: 'interest5',
    text: 'When a teacher briefly explains a tricky concept, how do you usually react?',
    options: [
      { value: 'aa_hl', label: 'I want to investigate it more deeply—maybe see a formal proof' },
      { value: 'ai_hl', label: 'I want to see examples of its use in everyday life' },
      { value: 'aa_sl', label: 'I want a straightforward procedure so I can follow it step by step' },
      { value: 'ai_sl', label: 'I usually move on once the basics are clear' }
    ]
  },
  // Section C: Skills & Confidence (Original Section)
  {
    id: 'skill1',
    text: 'How comfortable are you with algebraic manipulation (solving equations, factoring, etc.)?',
    options: [
      { value: 'aa_hl', label: 'Very comfortable; algebra is one of my strengths' },
      { value: 'ai_hl', label: 'Adequate, but I prefer seeing how algebra is used in real problems' },
      { value: 'aa_sl', label: 'I sometimes struggle with complex algebraic steps' },
      { value: 'ai_sl', label: 'I find algebra quite difficult or uninteresting' }
    ]
  },
  {
    id: 'skill2',
    text: 'What about your comfort with calculus (derivatives, integrals, rates of change)?',
    options: [
      { value: 'aa_hl', label: "I'm very interested or excited to learn deeper calculus" },
      { value: 'ai_hl', label: "I can handle it if it's tied to practical applications or data analysis" },
      { value: 'aa_sl', label: 'I find it challenging and might need significant support' },
      { value: 'ai_sl', label: 'I have minimal interest in calculus' }
    ]
  },
  {
    id: 'skill3',
    text: 'Statistics and probability: how do you feel about analyzing data, interpreting results, etc.?',
    options: [
      { value: 'aa_hl', label: "I can do it, but I'm more drawn to abstract math than data-heavy work" },
      { value: 'ai_hl', label: 'I enjoy working with data and seeing how it applies to real-life contexts' },
      { value: 'aa_sl', label: "I'm okay with basic statistics but don't want it to be the main focus" },
      { value: 'ai_sl', label: 'I actually find statistical analysis easier or more practical than algebra' }
    ]
  },
  {
    id: 'skill4',
    text: 'Calculator and technology use: which statement best describes you?',
    options: [
      { value: 'aa_hl', label: "I'm comfortable working without a calculator for extended periods" },
      { value: 'ai_hl', label: "I'm happiest when I can use technology to handle calculations" },
      { value: 'aa_sl', label: "I don't mind calculators but can do simpler tasks by hand" },
      { value: 'ai_sl', label: "I rely heavily on a calculator; I'm not confident doing many steps manually" }
    ]
  },
  {
    id: 'skill5',
    text: 'When facing a difficult math problem, how do you usually proceed?',
    options: [
      { value: 'aa_hl', label: 'I enjoy tackling it creatively, trying multiple methods' },
      { value: 'ai_hl', label: 'I look for a real-life angle or context to make sense of it' },
      { value: 'aa_sl', label: 'I prefer looking up similar worked examples first' },
      { value: 'ai_sl', label: "I quickly seek help; I don't enjoy spending too long on one problem" }
    ]
  },
  // Section D: Learning Style (Original Section)
  {
    id: 'learning1',
    text: 'Which classroom scenario sounds most enjoyable to you?',
    options: [
      { value: 'aa_hl', label: 'Working individually on challenging theoretical problems and discussing proofs' },
      { value: 'ai_hl', label: 'Doing a group-based investigation where you collect or analyze real data' },
      { value: 'aa_sl', label: 'Practicing example after example to fully master a method' },
      { value: 'ai_sl', label: 'A mix, but nothing too in-depth or abstract' }
    ]
  },
  {
    id: 'learning2',
    text: "Imagine you have a 10-hour math project (IB Internal Assessment). What's your reaction?",
    options: [
      { value: 'aa_hl', label: "I'm excited to dive into something theoretical or proof-based" },
      { value: 'ai_hl', label: "I'd choose a project with real-world data or modeling" },
      { value: 'aa_sl', label: "I'm nervous; I prefer short exercises over big projects" },
      { value: 'ai_sl', label: "I'd pick the simplest topic that meets the requirement" }
    ]
  },
  {
    id: 'learning3',
    text: 'Do you enjoy interpreting graphs, charts, or statistical reports?',
    options: [
      { value: 'aa_hl', label: "They're fine, but I prefer symbolic or algebraic work" },
      { value: 'ai_hl', label: 'Yes, I really like connecting math to real data' },
      { value: 'aa_sl', label: "Occasionally, but I'm not passionate about it" },
      { value: 'ai_sl', label: "I'd rather do straightforward computations than interpret complicated graphs" }
    ]
  },
  {
    id: 'learning4',
    text: 'What do you typically find easier?',
    options: [
      { value: 'aa_hl', label: 'Manipulating symbolic expressions or proving a concept step by step' },
      { value: 'ai_hl', label: 'Evaluating a real situation, gathering data, and applying formulas' },
      { value: 'aa_sl', label: 'Neither is especially easy, but I try my best' },
      { value: 'ai_sl', label: 'Math feels difficult overall' }
    ]
  },
  {
    id: 'learning5',
    text: 'If you had to explain a math concept to a friend, would you...',
    options: [
      { value: 'aa_hl', label: 'Show them the theoretical underpinnings or a proof-like reasoning' },
      { value: 'ai_hl', label: 'Provide real-world examples or data that demonstrate its use' },
      { value: 'aa_sl', label: 'Demonstrate the basic procedural steps to get from question to answer' },
      { value: 'ai_sl', label: "Suggest they ask the teacher; I'm not comfortable explaining much" }
    ]
  },
  // Section E: Future Goals (Original Section)
  {
    id: 'future1',
    text: 'Why might you consider (or avoid) a Higher Level (HL) math course?',
    options: [
      { value: 'aa_hl', label: 'I love math and want the challenge—this is for my personal interest' },
      { value: 'ai_hl', label: 'It strengthens my university application, and I do enjoy math enough to handle HL' },
      { value: 'aa_sl', label: 'I feel pressured by parents or teachers, even though it might be stressful' },
      { value: 'ai_sl', label: "I'm leaning SL; I don't want to dedicate too many hours to math" }
    ]
  },
  {
    id: 'future2',
    text: 'How do you view the importance of math in your future academic or career path?',
    options: [
      { value: 'aa_hl', label: "I'm aiming for engineering, physics, or other math-intensive fields" },
      { value: 'ai_hl', label: 'Business, science, or other fields that benefit from strong math' },
      { value: 'aa_sl', label: "Not very important: likely a field that doesn't rely heavily on advanced math" },
      { value: 'ai_sl', label: "I'm unsure, but want to keep some options open" }
    ]
  },
  {
    id: 'future3',
    text: 'Have you checked if your prospective universities or programs require a specific math course?',
    options: [
      { value: 'aa_hl', label: 'Yes, they specifically require or strongly prefer AA HL' },
      { value: 'ai_hl', label: 'Yes, they require math HL, but AA or AI is acceptable' },
      { value: 'aa_sl', label: 'They only require math SL' },
      { value: 'ai_sl', label: "I'm not sure or no particular requirement" }
    ]
  },
  {
    id: 'future4',
    text: 'How much do external opinions (teachers, parents, peers) influence your choice?',
    options: [
      { value: 'aa_hl', label: "A lot: if a trusted authority advises a course, I'll follow it" },
      { value: 'ai_hl', label: 'They matter, but I still consider my own feelings the most' },
      { value: 'aa_sl', label: "Somewhat; I do worry about what peers or parents say, but it's not the only factor" },
      { value: 'ai_sl', label: 'Very little: I plan to make the decision independently' }
    ]
  },
  {
    id: 'future5',
    text: 'If your teacher suggests you could handle HL but you prefer SL, what would you do?',
    options: [
      { value: 'aa_hl', label: "Follow the teacher's advice and go for HL—they know my capabilities" },
      { value: 'ai_hl', label: "Consider it carefully but choose SL if that's what I truly want" },
      { value: 'aa_sl', label: 'Seek a second opinion from a counselor or older students' },
      { value: 'ai_sl', label: 'Stick with SL outright; I trust my own preference' }
    ]
  }
];

export type Answer = string;

// Utility function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Function to shuffle both the questions and the options within each question
export function getShuffledQuestions() {
  return shuffleArray(questions).map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));
}
