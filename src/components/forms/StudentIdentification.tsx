// src/components/forms/StudentIdentification.tsx
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface StudentIdentificationProps {
  onSubmit: (name: string, teacher: string) => void;
}

// List of teachers, including the test option
const TEACHERS = [
  'Mrs. Belmonte',
  'Mr. Radia',
  'Mr. Neves',
  'Mr. Costa',
  'Mr. Carvalho and Mr. Schreiber',
  '[TEST] Development Testing'
];

export function StudentIdentification({ onSubmit }: StudentIdentificationProps) {
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !teacher) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onSubmit(name.trim(), teacher);
  };

  return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-school-navy mb-6">Student Information</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {showError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="ml-3 text-red-700">
                    Please fill in both your full name and select your teacher.
                  </p>
                </div>
              </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-school-navy mb-2"
              >
                Full Name
              </label>
              <input
                  type="text"
                  id="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-school-navy focus:border-transparent"
                  placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                  htmlFor="teacher"
                  className="block text-sm font-medium text-school-navy mb-2"
              >
                Current Maths Teacher
              </label>
              <select
                  id="teacher"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-school-navy focus:border-transparent"
              >
                <option value="">Select your teacher...</option>
                {TEACHERS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
                type="submit"
                className="px-6 py-2 bg-school-navy text-white rounded-md hover:bg-school-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-school-navy"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
  );
}