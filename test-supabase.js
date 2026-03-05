const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    const { data, error } = await supabase.from('submissions').select('*').limit(1);
    if (data && data.length > 0) {
        console.log("Submissions columns:", Object.keys(data[0]));
    } else {
        console.log("No submission data found to infer columns.");
    }
}

checkSchema();
