import sql from 'mssql';
import connectToDatabase from '@/lib/mssqlconnectdb';
import {  NextResponse } from 'next/server';

export const GET = async (req: any) => {
  try {
    // Establish a database connection
    await connectToDatabase();

    // Get the query parameter from the request
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';

    // Create a new request object
    const request = new sql.Request();

    // Define the SQL query
    const sqlQuery = `
      SELECT 
        GRADE_APPLICATION
      FROM 
        [dbo].[MS_PROPEL_GRADES]
      WHERE 
        GRADE_APPLICATION LIKE '%' + @query + '%';
    `;

    // Set the parameter
    request.input('query', sql.NVarChar, query);

    // Execute the query
    const result = await request.query(sqlQuery);

    // Extract GRADE_APPLICATION values
    const suggestions = result.recordset.map(item => item.GRADE_APPLICATION);

    // Send the suggestions as a JSON response
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Database query failed', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
};
