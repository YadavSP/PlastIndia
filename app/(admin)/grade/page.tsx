'use client';

import { useEffect, useState } from 'react';

interface Grade {
    PRODUCT_NAME: string;
    SECTOR_NAME: string;
    GRADE_ID: string;
    MFI: string;
    DENSITY: string;
    SPECIAL_CHARACTERISTICS: string;
    GRADE_APPLICATION: string;
}

const GradesPage = () => {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [interestArea, setInterestArea] = useState<string>('');
    const [characteristics, setCharacteristics] = useState<string>('');

    useEffect(() => {
        // Get query parameters from the URL
        const { search } = window.location;
        const queryParams = new URLSearchParams(search);

        // Retrieve and log the query parameters directly
        const area = queryParams.get('interest_Area') || '';
        const chars = queryParams.get('Characterestics') || '';
        
        // Set state with query parameters
        setInterestArea(area);
        setCharacteristics(chars);

        console.log("interest_Area: ", area);  // Log here
        console.log("characteristics: ", chars); // Log here

        const fetchGrades = async () => {
            try {
                const body = {
                    interestArea: interestArea,
                    characteristics: characteristics
                   
          
                  };
                  console.log("body for fetch", body);
  
                  const response = await fetch('/api/getGrades', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                  });
            
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  const result: Grade[] = await response.json();
                  
                  setLoading(false);
                  
                setGrades(result);
            } catch (err) {
                setError("Error fetching grades");
            } finally {
                setLoading(false);
            }
        };

        fetchGrades();
    }, []);

    if (loading) return <div className="text-center text-xl">Loading...</div>;
    if (error) return <div className="text-center text-red-600">Error: {error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Grades List</h1>
        
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="px-6 py-4 text-left text-gray-600">Product</th>
                            <th className="px-6 py-4 text-left text-gray-600">Sector</th>
                            <th className="px-6 py-4 text-left text-gray-600">Grade</th>
                            <th className="px-6 py-4 text-left text-gray-600">MFI</th>
                            <th className="px-6 py-4 text-left text-gray-600">Density</th>
                            <th className="px-6 py-4 text-left text-gray-600">Special Characteristics</th>
                            <th className="px-6 py-4 text-left text-gray-600">Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((grade) => (
                            <tr key={grade.GRADE_ID} className="border-b hover:bg-gray-100 transition duration-200">
                                <td className="px-6 py-4">{grade.PRODUCT_NAME}</td>
                                <td className="px-6 py-4">{grade.SECTOR_NAME}</td>
                                <td className="px-6 py-4">{grade.GRADE_ID}</td>
                                <td className="px-6 py-4">{grade.MFI}</td>
                                <td className="px-6 py-4">{grade.DENSITY}</td>
                                <td className="px-6 py-4">{grade.SPECIAL_CHARACTERISTICS}</td>
                                <td className="px-6 py-4">{grade.GRADE_APPLICATION}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GradesPage;
