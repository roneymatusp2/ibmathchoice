import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface LoginProps {
  onLoginSuccess?: (userData: any) => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Log the attempted login for debugging
      console.log('Attempting login with:', email);

      // Use Supabase's signInWithPassword method directly
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      // If there's an error, throw it
      if (error) {
        console.error('Detailed login error:', {
          message: error.message,
          code: error.code,
          status: error.status
        });
        throw new Error(error.message);
      }

      // If login is successful
      if (data.user) {
        console.log('Login successful', data.user);

        // Optional: Fetch additional user information from school_staff
        const { data: staffData, error: staffError } = await supabase
            .from('school_staff')
            .select('*')
            .eq('email', email)
            .single();

        if (staffError) {
          console.warn('Could not fetch staff details:', staffError);
        }

        // Call onLoginSuccess with combined data
        onLoginSuccess?.({
          user: data.user,
          staffData: staffData || null
        });
      } else {
        throw new Error('No user data returned');
      }
    } catch (err) {
      // Comprehensive error handling
      const errorMessage = err instanceof Error
          ? err.message
          : 'Login failed. Please check your credentials.';

      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Staff Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                />
              </div>
            </div>

            {error && (
                <div className="text-red-500 text-center">
                  {error}
                </div>
            )}

            <div>
              <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Logging in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}