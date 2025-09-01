import Image from 'next/image';
import Link from 'next/link';
import { Home } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg py-4">
      <div className="m-2 flex flex-row items-center ">
        {/* Logo Section */}
        <div className="basis-1/3">
          <Image
            src="/ic_logo.gif"
            alt="Company Logo"
            width={250}
            height={140}
            className=""
          />
        </div>

        {/* Title Section */}
        <div className="basis-1/2">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Sustainable Development Department
          </h1>
        </div>

        {/* Home Button */}
        <div className="basis-1/10">
        <Link
          href="https://ioclintranet.indianoil.co.in/web/business-development-re-sd-department/"
          className="flex items-center justify-center bg-orange-500 text-white rounded-md p-2 hover:bg-orange-600 transition-colors duration-200"
        >
        <Home size={24} />  {/* Increased icon size */}
        <span className="ml-3 text-base font-semibold">Home</span> {/* Increased text size and adjusted spacing */}
      </Link>
      </div>
      </div>
    </nav>
  );
}

