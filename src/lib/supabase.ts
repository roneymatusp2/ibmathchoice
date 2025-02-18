import { createClient, SupabaseClient, AuthResponse } from '@supabase/supabase-js';

// Ensure environment variables are loaded
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Login function with comprehensive error handling
export const loginUser = async (email: string, password: string) => {
  try {
    console.log('Attempting login with:', email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Detailed login error:', {
        message: error.message,
        status: error.status,
        code: error.code
      });
      throw error;
    }

    // Fetch additional staff information
    const { data: staffData, error: staffError } = await supabase
        .from('school_staff')
        .select('*')
        .eq('email', email)
        .single();

    console.log('Login successful:', data);

    return {
      user: data.user,
      session: data.session,
      staffData: staffData || null
    };
  } catch (error) {
    console.error('Comprehensive login error:', error);
    throw error;
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Comprehensive logout error:', error);
    throw error;
  }
};

// Get current session
export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Session retrieval error:', error);
      throw error;
    }

    return session;
  } catch (error) {
    console.error('Comprehensive session retrieval error:', error);
    throw error;
  }
};

// Fetch staff details
export const getStaffDetails = async (email: string) => {
  try {
    const { data, error } = await supabase
        .from('school_staff')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
      console.error('Staff details retrieval error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Comprehensive staff details error:', error);
    throw error;
  }
};

// Helper type for staff user
export interface StaffUser {
  id: number;
  email: string;
  full_name: string;
  role: string;
  department?: string;
  teaches_form5?: boolean;
  is_admin?: boolean;
}

// Export types for type safety
export type { SupabaseClient, AuthResponse };