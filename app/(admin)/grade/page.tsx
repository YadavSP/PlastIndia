'use client';

import { useEffect, useState } from 'react';

// Import icons (ensure to import your icon components)
import { Beaker, Atom, Microscope, TestTube, Pipette } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Define the Grade interface
interface Grade {
    PRODUCT_NAME: string;
    SECTOR_NAME: string;
    GRADE_ID: string;
    MFI: string;
    DENSITY: string;
    SPECIAL_CHARACTERISTICS: string;
    GRADE_APPLICATION: string;
}

// Define the polymer colors with their icons
const polymerColor = [
    { icon: Beaker, color: "from-pink-200 to-purple-200" },
    { icon: Atom, color: "from-blue-200 to-cyan-200" },
    { icon: Microscope, color: "from-green-200 to-teal-200" },
    { icon: TestTube, color: "from-yellow-200 to-orange-200" },
    { icon: Pipette, color: "from-red-200 to-pink-200" },
];

const GradesPage = () => {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const { search } = window.location;
        const queryParams = new URLSearchParams(search);

        const area = queryParams.get('interest_Area') || '';
        const chars = queryParams.get('Characterestics') || '';

        const fetchGrades = async () => {
            try {
                const body = {
                    interestArea: area,
                    characteristics: chars,
                };

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
        <div className="container mx-auto p-1">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">IOCL Polymer Grades</h1>

            <div className="overflow-hidden shadow-md rounded-lg">
                <div className="max-h-[565px] overflow-y-auto">
                    <Table >
                        <TableHeader className="bg-green-300 text-xl font-semibold">
                            <TableRow >
                                <TableHead className="font-bold text-gray-800 px-6 py-4">Product</TableHead>
                                <TableHead className="font-bold text-gray-800 px-6 py-4">Sector</TableHead>
                                <TableHead className="font-bold text-gray-800 px-6 py-4">Grade</TableHead>
                                <TableHead className="font-bold text-gray-800 px-6 py-4">MFI</TableHead>
                                <TableHead className="font-bold text-gray-800 px-6 py-4">Density</TableHead>
                                <TableHead className="font-bold text-gray-800 px-6 py-4">Special Characteristics</TableHead>
                                <TableHead className="font-bold text-gray-800 px-6 py-4">Application</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {grades.map((grade, index) => {
                                const polymerIndex = index % polymerColor.length; // Cycle through the colors
                                const polymer = polymerColor[polymerIndex];

                                return (
                                    <TableRow key={grade.GRADE_ID} className={`bg-gradient-to-r text-xl ${polymer.color} hover:brightness-95 transition-all duration-200`}>
                                       <TableCell className="font-medium text-gray-800 px-6 py-4 ">
                                        <div className="flex items-center space-x-2">
                                            <polymer.icon className="w-6 h-6 text-gray-700" />
                                            <span>{grade.PRODUCT_NAME}</span>
                                        </div>
                                        </TableCell>

                                        <TableCell className="text-gray-700 px-6 py-4">{grade.SECTOR_NAME}</TableCell>
                                        <TableCell className="text-gray-700 px-6 py-4">{grade.GRADE_ID}</TableCell>
                                        <TableCell className="text-gray-700 px-6 py-4">{grade.MFI}</TableCell>
                                        <TableCell className="text-gray-700 px-6 py-4">{grade.DENSITY}</TableCell>
                                        <TableCell className="text-gray-700 px-6 py-4">{grade.SPECIAL_CHARACTERISTICS}</TableCell>
                                        <TableCell className="text-gray-700 px-6 py-4">{grade.GRADE_APPLICATION}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default GradesPage;
