'use client';

import { useEffect, useState } from 'react';
import { Beaker, Atom, Microscope, TestTube, Pipette } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Grade {
    PRODUCT_NAME: string;
    SECTOR_NAME: string;
    GRADE_ID: string;
    MFI: string;
    DENSITY: string;
    SPECIAL_CHARACTERISTICS: string;
    GRADE_APPLICATION: string;
}

const polymerColor = [
    { icon: Beaker, color: "from-pink-100 to-purple-100" },
    { icon: Atom, color: "from-blue-100 to-cyan-100" },
    { icon: Microscope, color: "from-green-100 to-teal-100" },
    { icon: TestTube, color: "from-yellow-100 to-orange-100" },
    { icon: Pipette, color: "from-red-100 to-pink-100" },
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
                const response = await fetch('/api/getGrades', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ interestArea: area, characteristics: chars }),
                });

                if (!response.ok) throw new Error('Network response was not ok');
                const result: Grade[] = await response.json();
                setGrades(result);
            } catch (err) {
                setError("Error fetching grades");
            } finally {
                setLoading(false);
            }
        };
        fetchGrades();
    }, []);

    if (loading) return <div className="text-center py-20 text-xl font-semibold text-blue-800">Loading Polymer Grades...</div>;
    if (error) return <div className="text-center py-20 text-red-600 font-bold">Error: {error}</div>;

    return (
        <div className="w-full max-w-7xl mx-auto p-2 md:p-4">
            <h1 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-8 text-center text-blue-900 tracking-tight">
                IOCL Polymer Grades
            </h1>

            {/* Main container with horizontal scroll for mobile */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
                    <Table className="min-w-[1000px] md:min-w-full">
                        <TableHeader className="bg-green-400 sticky top-0 z-20 shadow-sm">
                            <TableRow>
                                <TableHead className="font-bold text-gray-900 px-4 py-4 text-sm md:text-lg">Product</TableHead>
                                <TableHead className="font-bold text-gray-900 px-4 py-4 text-sm md:text-lg">Sector</TableHead>
                                <TableHead className="font-bold text-gray-900 px-4 py-4 text-sm md:text-lg">Grade</TableHead>
                                <TableHead className="font-bold text-gray-900 px-4 py-4 text-sm md:text-lg">MFI</TableHead>
                                <TableHead className="font-bold text-gray-900 px-4 py-4 text-sm md:text-lg">Density</TableHead>
                                <TableHead className="font-bold text-gray-900 px-4 py-4 text-sm md:text-lg">Special Characteristics</TableHead>
                                <TableHead className="font-bold text-gray-900 px-4 py-4 text-sm md:text-lg">Application</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {grades.length > 0 ? (
                                grades.map((grade, index) => {
                                    const polymer = polymerColor[index % polymerColor.length];

                                    return (
                                        <TableRow 
                                            key={grade.GRADE_ID} 
                                            className={`bg-gradient-to-r ${polymer.color} hover:saturate-150 transition-all duration-150 border-b border-white/20`}
                                        >
                                            <TableCell className="px-4 py-4 font-bold text-gray-900">
                                                <div className="flex items-center space-x-2">
                                                    <polymer.icon className="w-5 h-5 flex-shrink-0 text-gray-700" />
                                                    <span className="text-sm md:text-lg whitespace-nowrap">{grade.PRODUCT_NAME}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-gray-800 px-4 py-4 text-xs md:text-base font-medium">{grade.SECTOR_NAME}</TableCell>
                                            <TableCell className="text-gray-800 px-4 py-4 text-xs md:text-base font-bold">{grade.GRADE_ID}</TableCell>
                                            <TableCell className="text-gray-800 px-4 py-4 text-xs md:text-base whitespace-nowrap">{grade.MFI}</TableCell>
                                            <TableCell className="text-gray-800 px-4 py-4 text-xs md:text-base whitespace-nowrap">{grade.DENSITY}</TableCell>
                                            <TableCell className="text-gray-800 px-4 py-4 text-xs md:text-base leading-tight min-w-[200px]">{grade.SPECIAL_CHARACTERISTICS}</TableCell>
                                            <TableCell className="text-gray-800 px-4 py-4 text-xs md:text-base leading-tight min-w-[200px]">{grade.GRADE_APPLICATION}</TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10 text-xl text-gray-500 bg-gray-50">
                                        No grades found matching your criteria.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            
            {/* Scroll Indicator for Mobile */}
            <p className="text-center text-gray-500 text-xs mt-4 md:hidden">
                ← Swipe left or right to see more details →
            </p>
        </div>
    );
};

export default GradesPage;