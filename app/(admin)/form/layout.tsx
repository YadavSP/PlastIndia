
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       
      >
         <div
                    className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4"
                    style={{ backgroundImage: "url('/pic_bg.png')" }}
                >
                    <div className="absolute top-4 left-4">
                        <Link href="/">
                            <img src='/ic_logo.gif' alt="Company Logo" className="h-24" />
                        </Link>
                    </div>
                    <div className="mt-28 container mx-auto px-4 py-1 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg max-w-6xl relative z-10">
                        
                        {children} 
                        </div>
        
        </div>
        <div className="absolute top-4 right-4">
                        <img src='/propel_new.jpg' alt="Propel Image" className="h-24" />
                    </div>
      </body>
    </html>
  );
}
