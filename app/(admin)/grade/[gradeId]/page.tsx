'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, Download, Home, ArrowLeft, Lightbulb, Ruler, Microscope, Tags } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

// Define the Grade interface (updated to include tds_url)
interface Grade {
    PRODUCT_NAME: string;
    SECTOR_NAME: string;
    GRADE_ID: string;
    MFI: string;
    DENSITY: string;
    SPECIAL_CHARACTERISTICS: string;
    GRADE_APPLICATION: string;
    tds_url?: string; // Add tds_url here, make it optional if it might not always be present
}

const GradeDetailPage =  ({ params }: { params: Promise<{gradeId: string }> }) => {
    const { gradeId } = React.use(params);
    const [grade, setGrade] = useState<Grade | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!gradeId) return;

        const fetchGradeDetails = async () => {
            setLoading(true);
            setError(null);
            console.log('Fetching details for gradeId:', gradeId);
            try {
                const response = await fetch(`/api/getGradeById?gradeId=${gradeId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const result: Grade = await response.json();
                setGrade(result);
            } catch (err) {
                setError("Error fetching grade details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGradeDetails();
    }, [gradeId]);

    if (loading) return <div className="text-center py-20 text-xl font-semibold text-white">Loading Grade Details...</div>;
    if (error) return <div className="text-center py-20 text-red-600 font-bold">Error: {error}</div>;
    if (!grade) return <div className="text-center py-20 text-xl font-semibold text-white">Grade not found.</div>;

    // Use the fetched tds_url for the download link, with a fallback if it's not present
    const downloadLink = grade.tds_url || `https://yourdomain.com/downloads/${grade.GRADE_ID}-brochure.pdf`;


    return (
        <div className="relative flex flex-col items-center justify-center  p-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">
                Grade Details
            </h1>
            <div className="
                w-full max-w-6xl
                bg-white bg-opacity-30 backdrop-blur-lg
                rounded-2xl shadow-2xl
                relative z-10
                p-4 md:p-8 lg:p-12
                border border-white border-opacity-20
            ">
                <div className="relative m-4 flex flex-col lg:flex-row  rounded-lg shadow-2xl overflow-hidden bg-white bg-opacity-30 backdrop-blur-lg ">
                    <div className="lg:w-2/3 p-4 bg-white items-center ">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Badge className='bg-gradient-to-b from-[#E3CBBE] to-[#FFFFFF] border border-3 border-[#000000] text-black shadow-lg p-1 px-2'>
                                    <span className="text-sm font-normal text-gray-900">HDPE</span>
                                </Badge>
                                <Badge className='bg-gradient-to-b from-[#E3CBBE] to-[#FFFFFF] border-1 border-[#000000] text-black shadow-lg'>
                                    <span className="text-sm font-normal text-gray-900">
                                        Grade ID –
                                        <Badge className='bg-white border-1 border-[#000000] text-black shadow-lg m-1'>
                                            <span className="text-sm font-normal text-gray-900">{grade.GRADE_ID}</span>
                                        </Badge>
                                    </span>
                                </Badge>
                            </div>
                        </div>
                       <div className='h-0.5 bg-[#002480]'>
                        </div>

                        <div className="grid grid-cols-1  gap-4 mt-8 mb-8">
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    className='bg-gradient-to-b from-[#C5D5FF] to-[#EBF1FF] border-1 border-[#000000] text-white shadow-lg'
                                >
                                    <span className="text-sm font-normal text-gray-900">
                                        Sector –
                                        <Badge
                                            className='bg-white border-1 border-[#000000] text-black shadow-lg m-1'
                                        >
                                            <span className="text-sm font-normal text-gray-900">
                                                {grade.SECTOR_NAME}
                                            </span>
                                        </Badge>
                                    </span>
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className='bg-gradient-to-b from-[#C5D5FF] to-[#EBF1FF] border-1 border-[#000000] text-white shadow-lg'
                                >
                                    <Ruler className="mr-1 h-4 w-4 text-pink-400" />
                                    <span className="text-sm font-normal text-gray-900">
                                        MFI –
                                    </span>
                                    <Badge
                                        className='bg-white border-1 border-[#000000] text-black shadow-lg m-1'
                                    >
                                        <span className="text-sm font-normal text-gray-900">
                                            {grade.MFI}
                                        </span>
                                    </Badge>
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className='bg-gradient-to-b from-[#C5D5FF] to-[#EBF1FF] border-1 border-[#000000] text-white shadow-lg'
                                >
                                    <Lightbulb className="mr-1 h-4 w-4 text-purple-400" />
                                    <span className="text-sm font-normal text-gray-900">
                                        Density –
                                    </span>
                                    <Badge
                                        className='bg-white border-1 border-[#000000] text-black shadow-lg m-1'
                                    >
                                        <span className="text-sm font-normal text-gray-900">
                                            {grade.DENSITY}
                                        </span>
                                    </Badge>
                                </Badge>
                            </div>
                        </div>
                        <div className='h-0.5 bg-[#002480]'>
                        </div>

                        <div>
                            <h3 className="flex items-center gap-2 font-semibold text-gray-800 mt-8 mb-8">
                                <Microscope className="h-5 w-5 text-purple-500" />
                                <span className='text-[#F36F21]'>Special Characteristics</span>
                            </h3>
                            <p className="text-base text-black mt-1">
                                {grade.SPECIAL_CHARACTERISTICS}
                            </p>
                        </div>
                        <div className='h-0.5 bg-[#002480]'>
                        </div>

                        <div>
                            <h3 className="flex items-center gap-2 font-semibold text-gray-800 mt-8 mb-8">
                                <Tags className="h-5 w-5 text-orange-500" />
                                <span className='text-[#F36F21]'>Grade Application</span>
                            </h3>
                            <p className="text-base text-black">
                                {grade.GRADE_APPLICATION}
                            </p>
                        </div>
                         <div className='h-0.5 bg-[#002480]'>
                        </div>

                        <div className="flex justify-center gap-6 pt-4">
                            <Button
                                onClick={() => router.push('/')}
                                className="bg-gradient-to-b from-[#f36f21] to-[#ffd6be] text-[#00164E] font-bold hover:opacity-90 rounded-full flex items-center px-6"
                            >
                                <Home className="mr-2 h-4 w-4" /> Home
                            </Button>

                            <Button
                                onClick={() => router.back()}
                                className="bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 rounded-full flex items-center px-6"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
                            </Button>
                        </div>
                    </div>

                    <div className="lg:w-1/3 bg-gradient-to-br from-orange-400 to-red-500 p-8 flex flex-col items-center justify-center text-white text-center">
                        <h2 className="text-2xl font-bold mb-6">Scan to download TDS</h2>
                        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                            <QRCodeSVG value={downloadLink} size={180} level="H" />
                        </div>
                        <p className="text-sm mb-4">Open camera and scan the QR</p>
                        <div className="text-left text-sm">
                            <p>You will receive:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Brochure (PDF)</li>
                                <li>Selected grade sheets (PDFs)</li>
                                <li>Confirmation email with downloads</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradeDetailPage;