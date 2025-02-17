import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uwntdkzrllrpuefscobp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bnRka3pybGxycHVlZnNjb2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MDY2NjQsImV4cCI6MjA1NTM4MjY2NH0.Eb6pENtMy10FJ0KHUo8yCLFHCWfIbT4Qrbz9AmzGy7U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
