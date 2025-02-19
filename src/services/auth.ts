// src/services/auth.ts
import { supabase } from '../lib/supabase';

export const authService = {
  async loginWithEmail(email: string, password: string) {
    // sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;

    // fetch staff data
    const { data: staffData, error: staffError } = await supabase
        .from('school_staff')
        .select('*')
        .eq('email', email)
        .single();

    if (staffError) throw staffError;

    return { user: data.user, staffData };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentSession() {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }
};
