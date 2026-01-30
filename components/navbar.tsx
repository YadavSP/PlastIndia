// components/NavBar.tsx

"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button"; // adjust path if needed
import { ArrowLeft, HomeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
 const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";
    
  return (
   <header className="w-full relative z-20 flex items-center md:h-32  px-2 md:px-4 py-10 bg-[#00164E]">


      {/* Left Logo - Original Size */}
      <div className="flex-shrink-0 absolute left-2 md:left-4">
        <Link href="/">
          <img
            src="/ioc_logo.png"
            alt="Company Logo"
            className="h-12 sm:h-16 md:h-20 lg:h-32 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Center Home and Back Buttons */}
        {!isHome && (
      <div className="flex-1 flex justify-center items-center gap-2">
        <Link href="/">
          <Button
            className="bg-orange-500 hover:bg-orange-600 font-bold text-lg md:text-2xl text-zinc-100 shadow-lg px-4 md:px-8 h-10 md:h-14 flex items-center justify-center"
          >
            <HomeIcon className="h-6 w-6 md:h-8 md:w-8" />
          </Button>
        </Link>
         <Link href="#">
          <Button  onClick={() => router.back()}
            className="bg-orange-500 hover:bg-orange-600 font-bold text-lg md:text-2xl text-zinc-100 shadow-lg px-4 md:px-8 h-10 md:h-14 flex items-center justify-center"
          >
            <ArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
          </Button>
        </Link>
      </div>
        )}

      {/* Right Logo - Original Size */}
      <div className="flex-shrink-0 absolute right-2 md:right-4">
        <img
          src="/propel_new.jpg"
          alt="Propel Image"
          className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain rounded-md"
        />
      </div>

    </header>
  );
}