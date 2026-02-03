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
      .select('product_name,grade_id,grade_application')
      .or(`grade_application.ilike.%${queryTerm}%,product_name.ilike.%${queryTerm}%,grade_id.ilike.%${queryTerm}%`) // Search across all three fields
      .limit(10); // Efficiency: Only return top 10 matches

    if (error) throw error;

    // Modify this line to concatenate the fields
    const suggestions = data.map((item: any) => {
      const parts = [];
      
      if (item.product_name) parts.push(item.product_name);
      if (item.grade_id) parts.push(item.grade_id);
      if (item.grade_application) parts.push(item.grade_application);
      return parts.join(' - '); // Concatenate with a separator
    }).filter(Boolean); // Filter out any empty strings if all parts were null/undefined

    const uniqueSuggestions = Array.from(new Set(suggestions));

    return NextResponse.json(uniqueSuggestions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};