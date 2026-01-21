// app/api/getGrades/route.ts

import { supabase } from '@/lib/mssqlconnectdb';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { interestArea, characteristics } = await req.json();

    let query = supabase
      .from('ms_propel_grades') 
      .select(`
        GRADE_ID:grade_id, 
        PRODUCT_NAME:product_name, 
        SECTOR_NAME:sector_name, 
        MFI:mfi, 
        DENSITY:density, 
        SPECIAL_CHARACTERISTICS:special_characteristics, 
        GRADE_APPLICATION:grade_application
      `);
      console.log('Received filters:,query', { interestArea, characteristics },query);

    if (!characteristics || characteristics.trim() === '') {
      // Filter by interestArea only
      query = query.ilike('grade_application', `%${interestArea}%`);
    } else {
      // Filter by interestArea OR characteristics
      query = query.or(`grade_application.ilike.%${interestArea}%,special_characteristics.ilike.%${characteristics}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Supabase query failed', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};