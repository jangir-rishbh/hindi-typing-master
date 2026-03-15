import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url_here' 
    ? process.env.NEXT_PUBLIC_SUPABASE_URL 
    : 'https://placeholder.supabase.co';

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key_here'
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
    : 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseKey);
