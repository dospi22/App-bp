/**
 * Client Supabase per l'app.
 * Imposta in .env: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (non committare .env).
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase: mancano VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY in .env. Le funzioni che usano Supabase non saranno attive.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
