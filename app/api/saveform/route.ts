// app/api/saveform/route.ts

import { supabase } from '@/lib/mssqlconnectdb';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { name, mobileNumber, email, interest_Area, Characterestics } = body;

        const { error } = await supabase
            .from('user_interests') // Replace with your target table name
            .insert([
                { 
                    name: name, 
                    mobile_number: mobileNumber, 
                    email: email, 
                    interest_area: interest_Area, 
                    characteristics: Characterestics
                }
            ]);

        if (error) throw error;

        return NextResponse.json({ message: 'Data saved successfully' });
    } catch (error: any) {
        console.error('Supabase insert error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}