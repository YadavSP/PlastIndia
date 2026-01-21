
import Link from "next/link";

import { Button } from "@/components/ui/button";




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
                    <Button className="bg-orange-500 absolute top-4 font-bold text-2xl center-4 text-zinc-200" size={"lg"}>
                        <Link href="/">
                            Home
                        </Link>
                    </Button>
                    <div className="mt-8 container mx-auto px-4 py-1 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg max-w-8xl relative z-10">
                        
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
