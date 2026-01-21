'use client'

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background image */}
      <img 
        src='/pic_bg.png' 
        alt="Background" 
        className="absolute inset-0 object-cover w-full h-full" 
      />

      {/* Blurred glass effect container */}
      <div className="w-full max-w-6xl bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl relative z-10 p-6 md:p-12 lg:p-16 border border-white border-opacity-20">
        
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo 1 - Scaled for mobile */}
          <img src='/ic_logo.gif' alt="IOCL Logo" className="h-14 md:h-20 lg:h-24 object-contain" />
          
          {/* Title - Responsive font sizes */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-700 text-center leading-tight">
            PLASTINDIA 2026
          </h1>
          
          {/* Logo 2 - Scaled for mobile */}
          <img src='/propel_new.jpg' alt="Propel Logo" className="h-14 md:h-20 lg:h-24 object-contain rounded-lg" />
        </header>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-gray-800 text-center font-medium mb-10 md:mb-16">
          Petrochemical Products Showcase
        </p>
        
        {/* Responsive Centered Button */}
        <div className="flex justify-center">
          <Link 
            href="/form" 
            className="group relative w-full md:w-auto inline-flex items-center justify-center px-8 py-10 md:px-16 md:py-16 bg-green-600 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-green-700 active:scale-95 text-xl md:text-3xl text-center"
          >
            <span className="max-w-md">
              Click here to know about <br className="hidden md:block" /> IOCL Polymer Grades
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}