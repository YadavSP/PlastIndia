// app/grades/[gradeId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, Download, Home, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {QRCodeSVG} from 'qrcode.react'; // You'll need to install this library

// Define the Grade interface (you can reuse the one from GradesPage)
interface Grade {
    PRODUCT_NAME: string;
    SECTOR_NAME: string;
    GRADE_ID: string;
    MFI: string;
    DENSITY: string;
    SPECIAL_CHARACTERISTICS: string;
    GRADE_APPLICATION: string;
}

// You'll need to install qrcode.react:
// npm install qrcode.react

const GradeDetailPage = ({ params }: { params: { gradeId: string } }) => {
    const { gradeId } = params;
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
                // You'll need a new API endpoint to fetch a single grade by ID
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

    // Dummy URL for QR code - replace with your actual download link
    const downloadLink = `https://yourdomain.com/downloads/${grade.GRADE_ID}-brochure.pdf`; 

    return (

    <div className="relative flex flex-col items-center justify-center  p-4"> {/* Added items-center, min-h-screen, and p-4 for overall centering and responsiveness */}

      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center"> {/* Ensured text is centered and added responsive margin */}
       Grade Details
      </h1>

      {/* Blurred glass effect container */}
      <div className="
  w-full max-w-6xl
  bg-white bg-opacity-30 backdrop-blur-lg
  rounded-2xl shadow-2xl
  relative z-10
  p-4 md:p-8 lg:p-12
  border border-white border-opacity-20
">

        {/* Example content inside the glass effect, which will now be centered */}
        
            <div className="relative m-4 flex flex-col lg:flex-row  rounded-lg shadow-2xl overflow-hidden bg-white bg-opacity-30 backdrop-blur-lg ">
                {/* Left Section - Grade Details */}
                <div className="lg:w-2/3 p-4 bg-white">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div>
                            <p className="text-gray-600 text-sm">Density</p>
                            <Badge className='bg-white border border-gray-300 text-gray-800 shadow-sm p-2 px-3'>
                                <span className="text-base font-medium">{grade.DENSITY}</span>
                            </Badge>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">MFI</p>
                            <Badge className='bg-white border border-gray-300 text-gray-800 shadow-sm p-2 px-3'>
                                <span className="text-base font-medium">{grade.MFI}</span>
                            </Badge>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Sector</p>
                            <Badge className='bg-white border border-gray-300 text-gray-800 shadow-sm p-2 px-3'>
                                <span className="text-base font-medium">{grade.SECTOR_NAME}</span>
                            </Badge>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Product</p>
                            <Badge className='bg-white border border-gray-300 text-gray-800 shadow-sm p-2 px-3'>
                                <span className="text-base font-medium">{grade.PRODUCT_NAME}</span>
                            </Badge>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg mb-2">
                            <QrCode className="h-5 w-5 text-purple-500" />
                            <span className='text-[#F36F21]'>Special Characteristics</span>
                        </h3>
                        <p className="text-base text-gray-700">{grade.SPECIAL_CHARACTERISTICS}</p>
                    </div>

                    <div>
                        <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-lg mb-2">
                            <Download className="h-5 w-5 text-orange-500" />
                            <span className='text-[#F36F21]'>Grade Application</span>
                        </h3>
                        <p className="text-base text-gray-700">{grade.GRADE_APPLICATION}</p>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Button
                            onClick={() => router.push('/')}
                            className="bg-gradient-to-b from-[#f36f21] to-[#ffd6be] text-[#00164E] font-bold hover:opacity-90 rounded-full flex items-center"
                        >
                            <Home className="mr-2 h-4 w-4" /> Home
                        </Button>
                        <Button
                            onClick={() => router.back()}
                            className="bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 rounded-full flex items-center"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
                        </Button>
                    </div>
                </div>

                {/* Right Section - QR Code */}
                <div className="lg:w-1/3 bg-gradient-to-br from-orange-400 to-red-500 p-8 flex flex-col items-center justify-center text-white text-center">
                    <h2 className="text-2xl font-bold mb-6">Scan to download brochure + grade sheet</h2>
                    <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                        {/* QR Code component */}
                        <QRCodeSVG  value={downloadLink} size={180} level="H" />
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