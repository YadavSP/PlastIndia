// pages/api/saveForm.ts

import { NextRequest, NextResponse } from 'next/server';
//import sql from 'mssql'; // Importing sql for database operations
import sql from 'mssql'; // Importing sql for database operations
import connectToDatabase from "@/lib/mssqlconnectdb";


export const  POST= async(req: NextRequest) =>{
    //let connection: sql.ConnectionPool | null = null;

    try {
        const body = await req.json(); // Parse JSON body
        const {
            name,
            mobileNumber,
            email,
           
            interest_Area,
            Characterestics
        } = body;
        console.log("recived api", body);

        // Establish a database connection
        await connectToDatabase();
        
        const transaction = new sql.Transaction();
        await transaction.begin(); // Begin the transaction

        try {
            const request = transaction.request();
            await request
                .input('Name', sql.NVarChar, name)
                .input('MobileNumber', sql.NVarChar, mobileNumber)
                .input('Email', sql.NVarChar, email)
                .input('InterestArea', sql.NVarChar, interest_Area)
                .input('Characterestics', sql.NVarChar, Characterestics)
                .execute('formsave'); // Call your stored procedure

            await transaction.commit(); // Commit the transaction if successful

            return NextResponse.json({ message: 'Data saved successfully' });
        } catch (error) {
            console.error('Error executing stored procedure:', error);
            await transaction.rollback(); // Roll back the transaction if an error occurs
            return NextResponse.json({ message: 'Error executing stored procedure', error }, { status: 500 });
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
        return NextResponse.json({ message: 'Database connection error', error }, { status: 500 });
    } finally {
        
    }
}


