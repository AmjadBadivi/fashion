import { createClient } from "@supabase/supabase-js";


type User = {
    id: number;
    itemName: string;
    price: string;
    photo: string
}
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables!");
}

export const supabase = createClient<User>(supabaseUrl, supabaseAnonKey);
