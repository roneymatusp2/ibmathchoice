// src/App.tsx
import React, { useState } from 'react';
import {
  BookOpen,
  BrainCircuit,
  Calculator,
  BarChart as ChartBar,
  School,
  UserCog
} from 'lucide-react';

// Components
import Welcome from './components/Welcome';
import QuestionnaireForm from './components/QuestionnaireForm';
import SampleProblems from './components/SampleProblems';
import Results from './components/Results';

// Admin Components
import { Admin } from './components/admin/Admin';

// Import Supabase client
import { supabase } from './lib/supabase';

type AppStep = 'welcome' | 'questionnaire' | 'sample' | 'results' | 'admin';

function App() {
  const [step, setStep] = useState<AppStep>('welcome');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sampleAnswers, setSampleAnswers] = useState<Record<string, string>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleStart = () => {
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
    setStep('welcome');
  };

  const handleAdminLogin = () => {
    setStep('admin');
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setStep('welcome');
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
              {/* Conditional rendering of Staff Login or Logout */}
              {step !== 'admin' && !isLoggedIn && (
                  <button
                      onClick={handleAdminLogin}
                      className="inline-flex items-center px-4 py-2 border text-sm font-medium
                     rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <UserCog className="h-4 w-4 mr-2" />
                    Staff Login
                  </button>
              )}

              {isLoggedIn && (
                  <button
                      onClick={handleLogout}
                      className="inline-flex items-center px-4 py-2 border text-sm font-medium
                     rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Logout
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
                  onReset={handleReset}
              />
          )}
          {step === 'admin' && (
              <Admin
                  onLoginSuccess={() => setIsLoggedIn(true)}
                  onLogout={handleLogout}
              />
          )}
        </main>

        {/* FOOTER */}
        <footer className="bg-white mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-8">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-school-red mr-2" />
                <span className="text-school-navy">Analysis &amp; Approaches</span>
              </div>
              <div className="flex items-center">
                <ChartBar className="h-5 w-5 text-school-red mr-2" />
                <span className="text-school-navy">Applications &amp; Interpretation</span>
              </div>
              <div className="flex items-center">
                <Calculator className="h-5 w-5 text-school-red mr-2" />
                <span className="text-school-navy">Standard &amp; Higher Level</span>
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