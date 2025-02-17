import { supabase } from '../lib/supabase';

export const resultService = {
  async saveResult(result: {
    name: string;
    teacher: string;
    recommended_course: string;
    confidence: number;
    answers: any;
  }) {
    const { data, error } = await supabase
      .from('student_results')
      .insert([{
        ...result,
        timestamp: new Date().toISOString()
      }]);

    if (error) throw error;
    return data;
  },

  async getTeacherResults(teacherEmail: string) {
    const { data, error } = await supabase
      .from('student_results')
      .select('*')
      .eq('teacher', teacherEmail)
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getAllResults() {
    const { data, error } = await supabase
      .from('student_results')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data;
  }
};