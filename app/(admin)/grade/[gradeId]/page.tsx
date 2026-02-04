'use client'; // This directive is crucial for client components

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, Download, Home, ArrowLeft, Lightbulb, Ruler, Microscope, Tags, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import React from 'react';

interface Grade {
    PRODUCT_NAME: string;
    SECTOR_NAME: string;
    GRADE_ID: string;
    MFI: string;
    DENSITY: string;
    SPECIAL_CHARACTERISTICS: string;
    GRADE_APPLICATION: string;
    tds_url?: string;
}

const GradeDetailPage = ({ params }: { params: Promise< { gradeId: string } >}) => {
    const { gradeId } = React.use(params);
    const [grade, setGrade] = useState<Grade | null>(null);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Function to send email directly from the frontend
    const sendTdsEmailDirectlyFromFrontend = useCallback(async () => {
        if (!grade) {
            toast.error("Grade details not loaded yet. Please wait.", { id: "send-email-frontend-toast" });
            return;
        }

        let userEmail: string | null = null;
        let userName: string | null = null;

        if (typeof window !== 'undefined') {
            userEmail = sessionStorage.getItem('userEmail');
            userName = sessionStorage.getItem('userName');
        }

        if (!userEmail) {
            toast.warning("Could not send email: User email not found. Please fill out the form first.", { id: "send-email-frontend-toast", duration: 5000 });
            return;
        }

        toast.info("Sending TDS to your email...", { id: "send-email-frontend-toast", duration: 0 });

        try {
            const tdsUrl = grade.tds_url;
            const productName = grade.PRODUCT_NAME;
            const fetchedGradeId = grade.GRADE_ID;

            if (!tdsUrl) {
                toast.error("TDS URL not available for this grade.", { id: "send-email-frontend-toast" });
                return;
            }

            // Using a proxy for PDF download to avoid CORS issues
            // This assumes you have the /api/proxy-pdf endpoint set up in your Next.js backend
            const pdfResponse = await fetch(`/api/proxy-pdf?url=${encodeURIComponent(tdsUrl)}`);
            if (!pdfResponse.ok) {
                throw new Error(`Failed to download PDF from ${tdsUrl} via proxy: ${pdfResponse.statusText}`);
            }
            const pdfBlob = await pdfResponse.blob();

            // Convert Blob to Base64
            const reader = new FileReader();
            reader.readAsDataURL(pdfBlob);

            await new Promise<void>((resolve, reject) => {
                reader.onloadend = async () => {
                    const base64data = reader.result as string;
                    const pdfBase64 = base64data.split(',')[1]; // Get only the base64 part

                    const filenameMatch = tdsUrl.match(/\/([^\/?#]+)[\?#]?$/);
                    const fileName = filenameMatch ? filenameMatch[1] : `${productName}_${fetchedGradeId}_TDS.pdf`;

                    const mailSubject = `IOCL TDS for Polymer Grade: ${productName} - ${fetchedGradeId}`;
                    const mailBody = `
                        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                            <div style="text-align: center; margin-bottom: 20px;">
                                <h2 style="color: #002480; margin: 0; padding-bottom: 10px; border-bottom: 1px solid #eee;">Technical Data Sheet</h2>
                            </div>

                            <p>Dear ${userName || 'Valued Customer'},</p>
                            <p>Thank you for reaching out to us. We appreciate your interest in our polymer grades.</p>
                            <p>Please find the Technical Data Sheet (TDS) for <b>${productName} - ${fetchedGradeId}</b> conveniently attached to this email.</p>
                            <p>Should you require any further information or have additional questions, please do not hesitate to contact our team. We are always here to assist you.</p>

                            <p style="margin-top: 30px;">Best regards,</p>
                            <p style="margin: 0; font-weight: bold; color: #002480;">The IndianOil Team</p>
                            

                            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
                                <p style="margin: 0;">This is an automated email. Please do not reply to this address.</p>
                                <p style="margin: 0;">&copy; ${new Date().getFullYear()} IndianOil Corporation Ltd. All rights reserved.</p>
                            </div>
                        </div>
                    `;

                    const emailPayload = {
                        MailFrom: "iocladmin@indianoil.in",
                        MailTo: [userEmail],
                        MailCCTo: "",
                        MailBCCTo: ["yadavsp@indianoil.in"],
                        MailSubject: mailSubject,
                        MailBody: mailBody,
                        Attachments: [
                            {
                                FileName: fileName,
                                ContentBase64: pdfBase64,
                            },
                        ],
                    };

                    const emailApiUrl = 'https://bdqacvtms.indianoil.in/api/email';
                    const emailApiKey = 'bdis@2025'; // Exposing API keys in frontend is generally not recommended for production!

                    const sendEmailResponse = await fetch(emailApiUrl, {
                        method: 'POST',
                        headers: {
                            'x-api-key': emailApiKey, // This is a security risk if the API key is sensitive!
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(emailPayload),
                    });

                    if (!sendEmailResponse.ok) {
                        const errorText = await sendEmailResponse.text();
                        console.error('External email API error:', errorText);
                        throw new Error(`Failed to send email: ${sendEmailResponse.status} - ${errorText}`);
                    }

                    const emailResult = await sendEmailResponse.json();
                    console.log('Email sent successfully:', emailResult);
                    toast.success("TDS sent to your email successfully!", { id: "send-email-frontend-toast" });
                    resolve();
                };
                reader.onerror = (error) => reject(error);
            });

        } catch (err: any) {
            console.error('Failed to send email with TDS attachment:', err);
            toast.error(`Error sending email: ${err.message || "Something went wrong."}`, { id: "send-email-frontend-toast" });
        }
    }, [grade]); // Depend on grade to ensure its data is available

    // Effect for fetching grade details
    useEffect(() => {
        if (!gradeId) return;

        const fetchGradeDetails = async () => {
            setLoadingDetails(true);
            setError(null);
            console.log('Fetching grade details:', gradeId);
            try {
                const response = await fetch(`/api/getGradeById?gradeId=${gradeId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const result: Grade = await response.json();
                console.log('Fetched grade details:', result);
                setGrade(result);
            } catch (err: any) {
                setError("Error fetching grade details.");
                console.error(err);
                toast.error(`Error loading grade details: ${err.message || "Something went wrong."}`, { id: "grade-details-toast" });
            } finally {
                setLoadingDetails(false);
            }
        };

        fetchGradeDetails();
    }, [gradeId]);

    // Removed the useEffect that triggered backend email send on page load

    if (loadingDetails) return <div className="text-center py-20 text-xl font-semibold text-white">Loading Grade Details...</div>;
    if (error) return <div className="text-center py-20 text-red-600 font-bold">Error: {error}</div>;
    if (!grade) return <div className="text-center py-20 text-xl font-semibold text-white">Grade not found.</div>;

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
                                    <span className="text-sm font-normal text-gray-900">{grade.PRODUCT_NAME}</span>
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

                            {/* Button to trigger direct frontend email send */}
                            <Button
                                onClick={sendTdsEmailDirectlyFromFrontend}
                                className="bg-gradient-to-b from-[#1E90FF] to-[#87CEEB] text-white font-bold hover:opacity-90 rounded-full flex items-center px-6"
                                disabled={!grade || loadingDetails}
                            >
                                <Mail className="mr-2 h-4 w-4" /> Send Mail
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