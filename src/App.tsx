// src/App.tsx
import React, { useState } from 'react';
import { BookOpen, BrainCircuit, Calculator, BarChart as ChartBar, School, UserCog } from 'lucide-react';

// Components
import Welcome from './components/Welcome';
import QuestionnaireForm from './components/QuestionnaireForm';
import SampleProblems from './components/SampleProblems';
import Results from './components/Results';
import { Admin } from './components/admin/Admin';

function App() {
  // Adicionamos 'admin' como possível valor para step
  const [step, setStep] = useState<'welcome' | 'questionnaire' | 'sample' | 'results' | 'admin'>('welcome');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sampleAnswers, setSampleAnswers] = useState<Record<string, string>>({});
  const [studentInfo, setStudentInfo] = useState<{ name: string; teacher: string } | null>(null);

  const handleStart = (name: string, teacher: string) => {
    setStudentInfo({ name, teacher });
    setStep('questionnaire');
  };

  const handleQuestionnaireSubmit = (responses: Record<string, string>) => {
    setAnswers(responses);
    setStep('sample');
  };

  const handleSampleComplete = (responses: Record<string, string>) => {
    setSampleAnswers(responses);
    setStep('results');
  };

  const handleReset = () => {
    setAnswers({});
    setSampleAnswers({});
    setStudentInfo(null);
    setStep('welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-school-navy/5 to-school-red/5">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <School className="h-8 w-8 text-school-navy" />
            <h1 className="text-2xl font-bold text-school-navy">
              IB Mathematics Course Selection
            </h1>
          </div>
          <div className="flex space-x-4">
            {step === 'welcome' && (
              <button
                onClick={() => setStep('admin')}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <UserCog className="w-4 h-4 mr-2" />
                Staff Login
              </button>
            )}
            {step !== 'welcome' && step !== 'admin' && (
              <button
                onClick={handleReset}
                className="text-school-navy hover:text-school-red transition-colors"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {step === 'welcome' && <Welcome onStart={handleStart} />}
        {step === 'questionnaire' && (
          <QuestionnaireForm onSubmit={handleQuestionnaireSubmit} />
        )}
        {step === 'sample' && (
          <SampleProblems onComplete={handleSampleComplete} />
        )}
        {step === 'results' && (
          <Results
            answers={answers}
            sampleAnswers={sampleAnswers}
            studentInfo={studentInfo}
            onReset={handleReset}
          />
        )}
        {step === 'admin' && <Admin />}
      </main>

      {/* FOOTER */}
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-school-red mr-2" />
              <span className="text-school-navy">Analysis & Approaches</span>
            </div>
            <div className="flex items-center">
              <ChartBar className="h-5 w-5 text-school-red mr-2" />
              <span className="text-school-navy">Applications & Interpretation</span>
            </div>
            <div className="flex items-center">
              <Calculator className="h-5 w-5 text-school-red mr-2" />
              <span className="text-school-navy">Standard & Higher Level</span>
            </div>
            <div className="flex items-center">
              <BrainCircuit className="h-5 w-5 text-school-red mr-2" />
              <span className="text-school-navy">Personalized Guidance</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;