// src/components/QuestionnaireForm.tsx
import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  BookOpen,
  BrainCircuit,
  Calculator,
  School,
  GraduationCap,
  AlertCircle
} from 'lucide-react';
import { questions, Question } from '../data/questions';

interface QuestionnaireFormProps {
  onSubmit: (answers: Record<string, string>) => void;
}

// A helper to shuffle any array in place
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// For each question, shuffle its 'options'
function shuffleQuestion(q: Question): Question {
  return {
    ...q,
    options: shuffleArray(q.options),
  };
}

// Pull out 5-question slices, but shuffle them, plus shuffle the options
function getShuffledSlice(start: number, end: number): Question[] {
  const sliced = questions.slice(start, end);
  const shuffledQs = shuffleArray(sliced).map((q) => shuffleQuestion(q));
  return shuffledQs;
}

function QuestionnaireForm({ onSubmit }: QuestionnaireFormProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showValidation, setShowValidation] = useState(false);

  // We'll build the 5 "sections" at mount, each referencing a shuffled slice of the master array
  const [sections, setSections] = useState<
      {
        title: string;
        icon: React.ComponentType<any>;
        description: string;
        questions: Question[];
        color: string;
      }[]
  >([]);

  // On mount, define the five categories with their color & icons,
  // but use getShuffledSlice(...) to get random order in each slice
  useEffect(() => {
    setSections([
      {
        title: 'Career & Future Path',
        icon: GraduationCap,
        description: "Let's start by understanding your academic and career aspirations",
        questions: getShuffledSlice(0, 5), // shuffle questions[0..4]
        color: 'from-purple-500 to-indigo-600',
      },
      {
        title: 'Interest & Enjoyment',
        icon: BookOpen,
        description: 'Tell us about your relationship with mathematics',
        questions: getShuffledSlice(5, 10), // shuffle questions[5..9]
        color: 'from-blue-500 to-cyan-500',
      },
      {
        title: 'Skills & Confidence',
        icon: Calculator,
        description: 'Assess your mathematical abilities and comfort level',
        questions: getShuffledSlice(10, 15), // shuffle questions[10..14]
        color: 'from-emerald-500 to-teal-500',
      },
      {
        title: 'Learning Style',
        icon: BrainCircuit,
        description: 'How do you prefer to learn and engage with mathematics?',
        questions: getShuffledSlice(15, 20), // shuffle questions[15..19]
        color: 'from-orange-500 to-amber-500',
      },
      {
        title: 'Future Goals',
        icon: School,
        description: 'Your aspirations and plans for higher education',
        questions: getShuffledSlice(20, 25), // shuffle questions[20..24]
        color: 'from-rose-500 to-pink-500',
      },
    ]);
  }, []);

  // When user selects an answer
  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setShowValidation(false);
  };

  // Which section are we on?
  const currentQuestions = sections[currentSection]?.questions || [];

  // Have all questions in the current section been answered?
  const isCurrentSectionComplete = currentQuestions.every((q) => answers[q.id]);

  // Are we on the last of the 5 sections?
  const isLastSection = currentSection === sections.length - 1;

  // Are we on the first section?
  const isFirstSection = currentSection === 0;

  // For the progress bar
  const totalQuestions = 25; // we know there are 25 total
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  // Check if ALL 25 are answered
  const isFormComplete = useMemo(() => {
    return questions.every((q) => answers[q.id]);
  }, [answers]);

  // Next button logic
  const handleNext = () => {
    // If we are on the final section, we want to submit
    if (isLastSection) {
      if (!isFormComplete) {
        setShowValidation(true);
        return;
      }
      onSubmit(answers);
    } else {
      setCurrentSection((prev) => prev + 1);
    }
  };

  // Previous button logic
  const handlePrevious = () => {
    setCurrentSection((prev) => prev - 1);
  };

  // The icon for the current section
  const CurrentIcon = sections[currentSection]?.icon || BookOpen;

  // Figure out which sections still have unanswered questions
  const unansweredSections = sections
      .map((section, index) => {
        const unansweredCount = section.questions.filter((q) => !answers[q.id]).length;
        return {
          index,
          title: section.title,
          count: unansweredCount,
        };
      })
      .filter((sec) => sec.count > 0);

  // If sections haven't even loaded yet, show a loading spinner
  if (sections.length === 0) {
    return (
        <div className="p-4 text-center text-school-navy">
          Loading & shuffling questions...
        </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto">
        {/* SECTION HEADER & PROGRESS */}
        <div className="mb-8">
          {/* Title & description */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <CurrentIcon className="h-8 w-8 text-school-navy" />
              <div>
                <h2 className="text-2xl font-bold text-school-navy">
                  {sections[currentSection].title}
                </h2>
                <p className="text-school-navy/70">
                  {sections[currentSection].description}
                </p>
              </div>
            </div>
            {/* Section X of Y, answeredQuestions of total */}
            <div className="text-right">
            <span className="text-school-navy/70 font-medium block">
              Section {currentSection + 1} of {sections.length}
            </span>
              <span className="text-school-navy/60 text-sm">
              {answeredQuestions} of {totalQuestions} questions answered
            </span>
            </div>
          </div>

          {/* Section Nav Buttons */}
          <div className="flex space-x-2 mb-4">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isComplete = section.questions.every((q) => answers[q.id]);
              const active = currentSection === index;

              return (
                  <button
                      key={section.title}
                      onClick={() => setCurrentSection(index)}
                      className={`flex-1 p-2 rounded-lg transition-all ${
                          active
                              ? `bg-gradient-to-r ${section.color} text-white shadow-lg scale-105`
                              : isComplete
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium hidden md:inline">
                    {section.title}
                  </span>
                    </div>
                  </button>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
                className={`h-2 transition-all duration-300 bg-gradient-to-r ${sections[currentSection].color}`}
                style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Validation Message if user tries to submit with unanswered questions */}
          {showValidation && !isFormComplete && (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Please complete all questions before submitting
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p className="font-medium">Sections with unanswered questions:</p>
                      <ul className="mt-1 list-disc list-inside">
                        {unansweredSections.map((sec) => (
                            <li key={sec.index}>
                              {sec.title} ({sec.count} question
                              {sec.count > 1 ? 's' : ''} remaining)
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>

        {/* QUESTIONS in the current section */}
        <div className="space-y-6">
          {currentQuestions.map((question, qIndex) => (
              <div
                  key={question.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              >
                {/* Little top color bar */}
                <div className={`h-1 bg-gradient-to-r ${sections[currentSection].color}`} />
                <div className="p-6">
                  <p className="text-lg font-medium text-school-navy mb-4">
                    {qIndex + 1}. {question.text}
                  </p>
                  <div className="space-y-3">
                    {question.options.map((option) => {
                      const selected = answers[question.id] === option.value;
                      return (
                          <label
                              key={option.value}
                              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                        ${
                                  selected
                                      ? `border-transparent bg-gradient-to-r ${sections[currentSection].color} text-white`
                                      : 'border-gray-200 hover:border-gray-300 bg-white'
                              }
                      `}
                          >
                            <input
                                type="radio"
                                name={question.id}
                                value={option.value}
                                checked={selected}
                                onChange={() => handleAnswer(question.id, option.value)}
                                className="h-4 w-4 text-white border-white focus:ring-offset-0 focus:ring-0"
                            />
                            <span className="ml-3">{option.label}</span>
                          </label>
                      );
                    })}
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="mt-8 flex justify-between">
          {!isFirstSection && (
              <button
                  onClick={handlePrevious}
                  className="inline-flex items-center px-6 py-3 border-2 border-school-navy text-base font-medium rounded-lg text-school-navy hover:bg-school-navy/5 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Previous Section
              </button>
          )}
          <div className="flex-1" />
          <button
              onClick={handleNext}
              disabled={!isCurrentSectionComplete}
              className={`inline-flex items-center px-6 py-3 border-2 text-base font-medium rounded-lg transition-all
            ${
                  isCurrentSectionComplete
                      ? `bg-gradient-to-r ${sections[currentSection].color} text-white border-transparent hover:opacity-90`
                      : 'border-gray-300 bg-gray-300 text-white cursor-not-allowed'
              }
          `}
          >
            {isLastSection ? (
                <>
                  Submit Questionnaire
                  <CheckCircle className="ml-2 h-5 w-5" />
                </>
            ) : (
                <>
                  Next Section
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
            )}
          </button>
        </div>
      </div>
  );
}

export default QuestionnaireForm;
