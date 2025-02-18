import React, { useState, useEffect } from 'react';
import { Login } from './Login';
import { supabase } from '../../lib/supabase';

interface AdminProps {
  onLoginSuccess?: () => void;
  onLogout?: () => void;
}

export function Admin({ onLoginSuccess, onLogout }: AdminProps) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check current session on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        onLoginSuccess?.();
      }
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setSession(session);
          if (session) {
            onLoginSuccess?.();
          }
        }
    );

    // Cleanup subscription
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [onLoginSuccess]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout?.();
  };

  // If no session, show login
  if (!session) {
    return <Login onLoginSuccess={() => onLoginSuccess?.()} />;
  }

  // If logged in, show admin dashboard
  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
        {/* Add more dashboard content here */}
      </div>
  );
}