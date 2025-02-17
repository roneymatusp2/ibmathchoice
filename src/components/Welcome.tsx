import React from 'react';
import { ArrowRight, BookOpen, BrainCircuit, Calculator, BarChart as ChartBar, School } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/GwisekGc2kY"
            title="IB Mathematics Course Selection Guide"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-0"
          />
        </div>
        <div className="flex justify-center mb-6">
          <School className="h-16 w-16 text-school-navy" />
        </div>
        <h1 className="text-4xl font-bold text-school-navy mb-4">
          IB Mathematics Course Selection
        </h1>
        <p className="text-xl text-school-navy/80">
          Find your ideal path in IB Mathematics
        </p>
        <div className="flex justify-center gap-2 mt-2">
          <span className="text-school-red font-semibold">Analysis & Approaches</span>
          <span className="text-school-navy">or</span>
          <span className="text-school-red font-semibold">Applications & Interpretation</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg mb-12 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-school-navy to-school-red" />
        <div className="p-8">
          <h2 className="text-2xl font-bold text-school-navy mb-6">About This Questionnaire</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-school-navy/5 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <BookOpen className="h-6 w-6 text-school-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-school-navy">AA Higher Level</h3>
                  <p className="text-sm text-school-navy/70">Pure mathematics focus, ideal for future engineers/physicists</p>
                </div>
              </div>
            </div>
            <div className="bg-school-navy/5 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <BookOpen className="h-6 w-6 text-school-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-school-navy">AA Standard Level</h3>
                  <p className="text-sm text-school-navy/70">Balanced theoretical approach with manageable workload</p>
                </div>
              </div>
            </div>
            <div className="bg-school-navy/5 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <ChartBar className="h-6 w-6 text-school-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-school-navy">AI Higher Level</h3>
                  <p className="text-sm text-school-navy/70">Applied focus with advanced modeling and statistics</p>
                </div>
              </div>
            </div>
            <div className="bg-school-navy/5 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <ChartBar className="h-6 w-6 text-school-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-school-navy">AI Standard Level</h3>
                  <p className="text-sm text-school-navy/70">Practical mathematics with technology integration</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-school-red/5 border-l-4 border-school-red p-6 rounded-r-lg mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <Calculator className="h-6 w-6 text-school-red" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-school-navy mb-2">Important Note</h3>
                <p className="text-school-navy/70 space-y-2">
                  Your responses will help determine which course best matches your:
                </p>
                <ul className="mt-2 space-y-1 text-school-navy/70">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-school-red mr-2" />
                    Mathematical interests and abilities
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-school-red mr-2" />
                    Learning style preferences
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-school-red mr-2" />
                    Academic and career goals
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onStart}
              className="inline-flex items-center px-8 py-3 border-2 border-school-red text-lg font-semibold rounded-lg text-white bg-school-red hover:bg-school-red/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-school-red"
            >
              Start Questionnaire
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;