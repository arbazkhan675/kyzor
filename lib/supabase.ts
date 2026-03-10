import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Global auth listener to handle session invalidation
if (typeof window !== "undefined") {
    supabase.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_OUT") {
            // Clear any custom role tracking or other local state
            localStorage.removeItem("kyzor_role");
        }
    });
}
