import React from 'react';
import { calculateResults } from '../utils/scoring';
import { ArrowUpIcon as ArrowPathIcon, BookOpen, BrainCircuit, Calculator, BarChart as ChartBar } from 'lucide-react';

interface ResultsProps {
  answers: Record<string, string>;
  sampleAnswers: Record<string, string>;
  onReset: () => void;
}

function Results({ answers, sampleAnswers, onReset }: ResultsProps) {
  const results = calculateResults(answers);
  const { course, level, confidence, details } = results;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Recommended Course
          </h2>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-indigo-100 text-indigo-800 text-xl font-semibold">
            {course === 'AA' ? (
              <BookOpen className="h-6 w-6 mr-2" />
            ) : (
              <ChartBar className="h-6 w-6 mr-2" />
            )}
            Mathematics: {course === 'AA' ? 'Analysis & Approaches' : 'Applications & Interpretation'} ({level})
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Calculator className="h-5 w-5 mr-2 text-indigo-600" />
              Course Focus
            </h3>
            <p className="text-gray-700">{details.focus}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <BrainCircuit className="h-5 w-5 mr-2 text-indigo-600" />
              Learning Style Match
            </h3>
            <p className="text-gray-700">{details.style}</p>
          </div>
        </div>

        {Object.keys(sampleAnswers).length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-3">Sample Problem Results</h3>
            <p className="text-gray-700">
              You attempted {Object.keys(sampleAnswers).length} sample problems. These problems were designed
              to give you a taste of different mathematical approaches you might encounter in your chosen course.
            </p>
          </div>
        )}

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Recommendation Confidence: {confidence}%
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>{details.advice}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onReset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Take Questionnaire Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;