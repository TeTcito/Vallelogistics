import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://yusllfpksycdjzkmlouk.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1c2xsZnBrc3ljZGp6a21sb3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0MDI0NDgsImV4cCI6MjEwNjk3ODQ0OH0.mnItbXauFuQl-E2B63nYkBAkj0Z6iAnrkFLC4qso6qU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DatabaseProduct {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  show_price: boolean;
  image: string | null;
  tag: string | null;
  category: string;
  subcategory: string | null;
  brand: string | null;
  sku: string | null;
  compatibility: string[];
  rating: number;
  stock_status: string;
  created_at?: string;
  updated_at?: string;
}

export interface AdminProfile {
  id: string;
  first_name: string;
  last_name: string;
  bio: string | null;
  phone: string | null;
  avatar_url: string | null;
  updated_at?: string;
}
