// pages/api/saveForm.ts

import { NextRequest, NextResponse } from 'next/server';
//import sql from 'mssql'; // Importing sql for database operations
import sql from 'mssql'; // Importing sql for database operations
import connectToDatabase from "@/lib/mssqlconnectdb";


export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
      // Ensure you have established a database connection
      await connectToDatabase();
  
      // Parse the JSON body from the request
      const body = await req.json();
      console.log("received dasta",body);
  
      // Create a new request object for the stored procedure
      const request = new sql.Request();
  
      // Assuming the stored procedure 'spPendingForApproval' accepts parameters,
      // you can add them like this:
  
      request.input('emp_no', sql.NVarChar, body.empnumber);  // Adjust parameter names and types
  
  
      // Execute the stored procedure
      const result = await request.execute('fetchmealdata');
  
      // Send the combined response
      return NextResponse.json(result.recordset);
    } catch (error) {
      console.error('Database query failed', error);
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
  };
  

