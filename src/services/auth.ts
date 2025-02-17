import { supabase } from '../lib/supabase';

export const authService = {
  async loginWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Erro no login:', error.message);
      throw error;
    }

    // Buscar informações adicionais do usuário
    const { data: staffData, error: staffError } = await supabase
      .from('school_staff')
      .select('*')
      .eq('email', email)
      .single();

    if (staffError) {
      console.error('Erro ao buscar dados do staff:', staffError.message);
      throw staffError;
    }

    return {
      user: data.user,
      staffData
    };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }
};