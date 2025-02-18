import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uwntdkzrllrpuefscobp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bnRka3pybGxycHVlZnNjb2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MDY2NjQsImV4cCI6MjA1NTM4MjY2NH0.Eb6pENtMy10FJ0KHUo8yCLFHCWfIbT4Qrbz9AmzGy7U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
});

// Add error handling wrapper
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Auth error:', error.message);
      throw error;
    }

    // After successful auth, check if user exists in school_staff table
    const { data: staffData, error: staffError } = await supabase
        .from('school_staff')
        .select('*')
        .eq('email', email)
        .single();

    if (staffError) {
      console.error('Staff data error:', staffError.message);
      throw staffError;
    }

    return { user: data.user, staffData };
  } catch (err) {
    console.error('Unexpected error:', err);
    throw err;
  }
}