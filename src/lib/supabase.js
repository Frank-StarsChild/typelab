import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabase 客户端单例：项目内统一从 '@/lib/supabase' 导入。
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
