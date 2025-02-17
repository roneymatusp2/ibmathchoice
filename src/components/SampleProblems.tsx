import React from 'react';

interface SampleProblemProps {
  onComplete: (answers: Record<string, string>) => void;
  onSkip: () => void;
}

function SampleProblems({ onComplete, onSkip }: SampleProblemProps) {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const handleAnswer = (problemId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [problemId]: answer }));
  };

  const handleSubmit = () => {
    onComplete(answers);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sample IB Math Questions</h2>
        <p className="text-gray-600 mb-8">
          These sample problems reflect different approaches to mathematics. Feel free to attempt them or skip if you prefer.
        </p>

        <div className="space-y-8">
          {/* Problem 1 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Sample Problem 1</h3>
            <div className="mb-4">
              <p className="mb-2">A survey at a local cafe records the number of coffee cups sold over 5 consecutive days:</p>
              <p className="font-mono text-center mb-2">80, 72, 95, 88, 75</p>
              <p>What is the <em>mean</em> number of cups sold per day (to the nearest integer)?</p>
            </div>
            <div className="space-y-2">
              {['82', '85', '88', '90'].map((option) => (
                <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-white">
                  <input
                    type="radio"
                    name="problem1"
                    value={option}
                    checked={answers['problem1'] === option}
                    onChange={(e) => handleAnswer('problem1', e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Problem 2 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Sample Problem 2</h3>
            <div className="mb-4">
              <p>A function is defined by f(x) = x² - 2x + 3</p>
              <p>Use your calculator or algebra to find f(5).</p>
            </div>
            <div className="space-y-2">
              {['18', '13', '3', '8'].map((option) => (
                <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-white">
                  <input
                    type="radio"
                    name="problem2"
                    value={option}
                    checked={answers['problem2'] === option}
                    onChange={(e) => handleAnswer('problem2', e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Problem 3 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Sample Problem 3</h3>
            <div className="mb-4">
              <p>A company's weekly profit P (in dollars) can be modeled by:</p>
              <p className="font-mono text-center my-2">P(n) = 500n - 25n²</p>
              <p>where n is the number of products sold (in hundreds).</p>
              <p>If the company wants to maximize the weekly profit, for what integer value of n does this maximum occur?</p>
            </div>
            <div className="space-y-2">
              {['10', '20', '25', '30'].map((option) => (
                <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-white">
                  <input
                    type="radio"
                    name="problem3"
                    value={option}
                    checked={answers['problem3'] === option}
                    onChange={(e) => handleAnswer('problem3', e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3">n = {option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Problem 4 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Sample Problem 4</h3>
            <div className="mb-4">
              <p>Consider the polynomial g(x) = x³ - 6x² + 11x - 6</p>
              <p>One of the factors of g(x) is (x - 1).</p>
              <p>Which of the following represents a correct factorization of g(x)?</p>
            </div>
            <div className="space-y-2">
              {[
                '(x-1)(x² - 5x + 6)',
                '(x-1)(x² + x + 6)',
                '(x+1)(x² - 7x + 6)',
                '(x-1)(x² - 6x + 5)'
              ].map((option) => (
                <label key={option} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-white">
                  <input
                    type="radio"
                    name="problem4"
                    value={option}
                    checked={answers['problem4'] === option}
                    onChange={(e) => handleAnswer('problem4', e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-3">g(x) = {option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={onSkip}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Skip Sample Problems
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Submit Answers
          </button>
        </div>
      </div>
    </div>
  );
}

export default SampleProblems;