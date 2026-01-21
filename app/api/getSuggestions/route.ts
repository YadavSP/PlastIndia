// app/api/getSuggestions/route.ts

import { supabase } from '@/lib/mssqlconnectdb';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const queryTerm = searchParams.get('query') || '';

    if (queryTerm.length < 3) return NextResponse.json([]); // Safety check

    const { data, error } = await supabase
      .from('ms_propel_grades')
      .select('grade_application')
      .ilike('grade_application', `%${queryTerm}%`)
      .limit(10); // Efficiency: Only return top 10 matches

    if (error) throw error;

    const suggestions = data.map((item: any) => item.grade_application).filter(Boolean);
    const uniqueSuggestions = Array.from(new Set(suggestions));

    return NextResponse.json(uniqueSuggestions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};