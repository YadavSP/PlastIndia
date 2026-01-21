// app/api/getSuggestions/route.ts
// Make sure this points to your new supabase client file
import { supabase } from '@/lib/mssqlconnectdb';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const queryTerm = searchParams.get('query') || '';

    const { data, error } = await supabase
      .from('ms_propel_grades')
      .select('grade_application')
      .ilike('grade_application', `%${queryTerm}%`);

    if (error) throw error;

    // 1. Map to get the strings. 
    // 2. .filter(Boolean) removes any null or empty values.
    const suggestions = data
      .map((item: any) => item.GRADE_APPLICATION)
      .filter(Boolean);
    
    // 3. Use Array.from instead of the spread operator to avoid the TS2802 error
    const uniqueSuggestions = Array.from(new Set(suggestions));

    return NextResponse.json(uniqueSuggestions);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};