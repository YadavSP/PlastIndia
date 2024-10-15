'use client'

import Link from 'next/link';




export default function Dashboard() {
 

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <img src='/pic_bg.png' alt="Background" className="absolute inset-0 object-cover w-full h-full" style={{ objectFit: 'cover' }} />

      {/* Blurred glass effect container */}
      <div className="container mx-auto px-4 py-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg max-w-8xl relative z-10">
        <header className="flex items-center justify-between mb-4">
          <img src='/ic_logo.gif' alt="IOCL Logo" className="h-20" />
          <h1 className="text-4xl font-bold text-green-600">INDIA CHEM 2024</h1>
          <img src='/propel_new.jpg' alt="Propel Logo" className="h-20" />
        </header>
        <p className="text-xl text-gray-700 text-center mb-8">Petrochemical Products Showcase</p>
        
        {/* Centered Button */}
        <div className="flex justify-center mb-8">
          <Link href="/form" className="px-16 py-16 bg-green-600 text-white font-semibold rounded-lg shadow-lg transition text-2xl hover:bg-green-700">
            Click here to know about IOCL Polymer Grades
          </Link>
        </div>
      </div>
    </div>
  );
}
