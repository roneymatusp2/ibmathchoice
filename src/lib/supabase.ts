import { createClient, SupabaseClient, AuthResponse } from '@supabase/supabase-js';

// Carrega as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase ausentes');
}

// Cria o cliente do Supabase com opções avançadas de autenticação
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Função para realizar login com tratamento detalhado de erros
export const loginUser = async (email: string, password: string) => {
  try {
    console.log('Tentando login com:', email);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Erro detalhado no login:', {
        message: error.message,
        status: error.status,
        code: error.code
      });
      throw error;
    }

    // Busca informações adicionais na tabela "school_staff"
    const { data: staffData, error: staffError } = await supabase
        .from('school_staff')
        .select('*')
        .eq('email', email)
        .single();

    if (staffError) {
      console.error('Erro ao buscar dados do staff:', staffError);
    }

    console.log('Login realizado com sucesso:', data);

    return {
      user: data.user,
      session: data.session,
      staffData: staffData || null
    };
  } catch (error) {
    console.error('Erro abrangente no login:', error);
    throw error;
  }
};

// Função para logout
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Erro abrangente no logout:', error);
    throw error;
  }
};

// Função para obter a sessão atual
export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Erro ao recuperar a sessão:', error);
      throw error;
    }
    return session;
  } catch (error) {
    console.error('Erro abrangente ao recuperar a sessão:', error);
    throw error;
  }
};

// Função para buscar os detalhes do staff com base no email
export const getStaffDetails = async (email: string) => {
  try {
    const { data, error } = await supabase
        .from('school_staff')
        .select('*')
        .eq('email', email)
        .single();
    if (error) {
      console.error('Erro ao buscar detalhes do staff:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Erro abrangente ao buscar detalhes do staff:', error);
    throw error;
  }
};

// Interface para o usuário do staff
export interface StaffUser {
  id: number;
  email: string;
  full_name: string;
  role: string;
  department?: string;
  teaches_form5?: boolean;
  is_admin?: boolean;
}

// Exporta os tipos para garantir a segurança em tempo de compilação
export type { SupabaseClient, AuthResponse };
