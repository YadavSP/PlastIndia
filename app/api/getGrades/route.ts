import sql from 'mssql';
import connectToDatabase from '@/lib/mssqlconnectdb';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    // Establish a database connection
    await connectToDatabase();

    // Parse the JSON body from the request
    const body = await req.json();
    
    console.log("Received data in body to call the API", body);

    const { interestArea, characteristics } = body;

    // Create a new request object for the stored procedure
    const request = new sql.Request();

    // Define the SQL query based on the input parameters
    let query;

    if (!characteristics || characteristics.trim() === '') {
      query = `
        SELECT 
          GRADE_ID,
          PRODUCT_NAME,
          SECTOR_NAME,
          MFI,
          DENSITY,
          SPECIAL_CHARACTERISTICS,
          GRADE_APPLICATION
        FROM 
          [dbo].[MS_PROPEL_GRADES]
        WHERE 
          GRADE_APPLICATION LIKE '%' + @interestArea + '%';
      `;
    } else {
      query = `
        SELECT 
          GRADE_ID,
          PRODUCT_NAME,
          SECTOR_NAME,
          MFI,
          DENSITY,
          SPECIAL_CHARACTERISTICS,
          GRADE_APPLICATION
        FROM 
          [dbo].[MS_PROPEL_GRADES]
        WHERE 
          GRADE_APPLICATION LIKE '%' + @interestArea + '%'
          OR SPECIAL_CHARACTERISTICS LIKE '%' + @characteristics + '%';
      `;
    }

    // Set the parameters
    request.input('interestArea', sql.VarChar, interestArea);
    if (characteristics) {
      request.input('characteristics', sql.VarChar, characteristics);
    }

    // Execute the query
    console.log("query",query)
    const res = await request.query(query);

    console.log("Result", res);

    // Send the combined response
    return NextResponse.json(res.recordset);
  } catch (error) {
    console.error('Database query failed', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
};
