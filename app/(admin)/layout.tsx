import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div
          className="min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center p-2 md:p-4"
          style={{ backgroundImage: "url('/pic_bg.png')" }}
        >
          {/* RESPONSIVE HEADER SECTION */}
          <header className="w-full relative z-20 flex flex-row items-center justify-between p-2 md:p-4 gap-2">
            {/* Left Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <img 
                  src='/ic_logo.gif' 
                  alt="Company Logo" 
                  className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain" 
                />
              </Link>
            </div>

            {/* Center Home Button */}
            <div className="flex-grow flex justify-center">
              <Link href="/">
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 font-bold text-lg md:text-2xl text-zinc-100 shadow-lg px-4 md:px-8 h-10 md:h-14"
                >
                  Home
                </Button>
              </Link>
            </div>

            {/* Right Logo */}
            <div className="flex-shrink-0">
              <img 
                src='/propel_new.jpg' 
                alt="Propel Image" 
                className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain rounded-md" 
              />
            </div>
          </header>

          {/* MAIN CONTENT CONTAINER */}
          <main className="w-full mt-4 md:mt-8 flex-grow flex items-center justify-center">
            <div className="container mx-auto px-3 py-4 md:px-6 md:py-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-2xl max-w-7xl relative z-10 border border-white/20">
              {children}
            </div>
          </main>
          
          {/* Optional Footer Spacer */}
          <div className="h-4 w-full"></div>
        </div>
      </body>
    </html>
  );
}