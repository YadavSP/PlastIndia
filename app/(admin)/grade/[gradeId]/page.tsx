'use client'; // This directive is crucial for client components

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, Download, Home, ArrowLeft, Lightbulb, Ruler, Microscope, Tags, Mail } from 'lucide-react'; // Added Mail icon
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

const GradeDetailPage = ({ params }: { params: Promise<{ gradeId: string }> }) => { // Changed type to directly get gradeId
    const { gradeId } = React.use(params);
    const [grade, setGrade] = useState<Grade | null>(null);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Memoize the email sending logic (BACKEND API CALL)
    const sendTdsEmail = useCallback(async (currentGradeId: string) => {
        let userEmail: string | null = null;
        let userName: string | null = null;

        if (typeof window !== 'undefined') {
            userEmail = sessionStorage.getItem('userEmail');
            userName = sessionStorage.getItem('userName');
        }

        if (!userEmail) {
            toast.warning("Could not send email (Backend): User email not found. Please fill out the form.", { id: "send-email-backend-toast", duration: 5000 });
            return;
        }

        toast.info("Sending TDS to your email via Backend...", { id: "send-email-backend-toast", duration: 0 });

        try {
            const emailResponse = await fetch('/api/send-tds-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gradeId: currentGradeId, userEmail, userName }),
            });

            if (!emailResponse.ok) {
                const errorData = await emailResponse.json();
                throw new Error(errorData.details || 'Failed to send email via Backend.');
            }
            toast.success("TDS sent to your email via Backend successfully!", { id: "send-email-backend-toast" });

        } catch (err: any) {
            console.error("Error sending email with TDS via Backend:", err);
            toast.error(`Error sending email (Backend): ${err.message || "Something went wrong."}`, { id: "send-email-backend-toast" });
        }
    }, []);

    // NEW: Function to send email directly from the frontend
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
            toast.warning("Could not send email (Frontend): User email not found. Please fill out the form.", { id: "send-email-frontend-toast", duration: 5000 });
            return;
        }

        toast.info("Sending TDS to your email directly from Frontend...", { id: "send-email-frontend-toast", duration: 0 });

        try {
            const tdsUrl = grade.tds_url;
            const productName = grade.PRODUCT_NAME;
            const fetchedGradeId = grade.GRADE_ID;

            if (!tdsUrl) {
                toast.error("TDS URL not available for this grade.", { id: "send-email-frontend-toast" });
                return;
            }

            // --- Step 1: Download PDF (requires a proxy or backend if CORS is an issue for direct download) ---
            // For a direct frontend call to external email API with attachment,
            // you'd typically need to fetch the PDF on the frontend and convert it to base64.
            // This might hit CORS issues depending on where the TDS is hosted.
            // A more robust solution for frontend direct mail with attachments often involves:
            // 1. A CORS-friendly proxy on your Next.js backend for fetching the PDF, or
            // 2. Ensuring the TDS server allows CORS from your frontend domain.
            //
            // For demonstration, let's assume the TDS URL is directly accessible or you have a proxy.
            // If you face CORS issues here, you might need a small /api/proxy-pdf endpoint on your backend.

            const pdfResponse = await fetch(`/api/proxy-pdf?url=${encodeURIComponent(tdsUrl)}`); // Use a proxy for CORS
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

                    const mailSubject = `TDS for Polymer Grade: ${productName} - ${fetchedGradeId}`;
                    const mailBody = `
                        <h1>Hello ${userName || 'User'},</h1>
                        <p>Thank you for your interest in our polymer grades. Please find the Technical Data Sheet (TDS) for <b>${productName} - ${fetchedGradeId}</b> attached.</p>
                        <p>If you have any further questions, feel free to contact us.</p>
                        <p>Regards,<br>Your Team</p>
                    `;

                    const emailPayload = {
                        MailFrom: "pbdadmin@indianoil.in",
                        MailTo: [userEmail],
                        MailCCTo: ["yadavsp@indianoil.in"],
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
                        console.error('External email API error (Frontend):', errorText);
                        throw new Error(`Failed to send email directly: ${sendEmailResponse.status} - ${errorText}`);
                    }

                    const emailResult = await sendEmailResponse.json();
                    console.log('Email sent successfully directly from Frontend:', emailResult);
                    toast.success("TDS sent to your email directly from Frontend successfully!", { id: "send-email-frontend-toast" });
                    resolve();
                };
                reader.onerror = (error) => reject(error);
            });

        } catch (err: any) {
            console.error('Failed to send email with TDS attachment (Frontend):', err);
            toast.error(`Error sending email (Frontend): ${err.message || "Something went wrong."}`, { id: "send-email-frontend-toast" });
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

    // Effect for triggering email send via BACKEND API (separately and non-blocking)
    useEffect(() => {
        if (gradeId && !loadingDetails && grade) { // Ensure grade object is available
            sendTdsEmail(gradeId);
        }
    }, [gradeId, loadingDetails, sendTdsEmail, grade]); // Added grade to dependencies

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

                            {/* NEW: Button to trigger direct frontend email send */}
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