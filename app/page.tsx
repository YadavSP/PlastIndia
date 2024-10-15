'use client'

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { File, ArrowRight, ArrowDown } from 'lucide-react';
import { Vortex } from '@/components/ui/vortex';

// Mock data for petrochemical products
const products = [
  { id: 1, name: "Polyethylene", grades: ["HDPE", "LDPE", "LLDPE"], color: "bg-timberwolf" },
  { id: 2, name: "Polypropylene", grades: ["Homopolymer", "Copolymer"], color: "bg-timberwolf" },
  { id: 3, name: "Polyvinyl Chloride", grades: ["Rigid PVC", "Flexible PVC"], color: "bg-timberwolf" },
  { id: 4, name: "Polystyrene", grades: ["GPPS", "HIPS"], color: "bg-french-gray" },
  { id: 5, name: "Acrylonitrile Butadiene Styrene", grades: ["Injection Molding", "Extrusion"], color: "bg-french-gray" },
  { id: 6, name: "Polyethylene Terephthalate", grades: ["Bottle Grade", "Fiber Grade"], color: "bg-french-gray" },
  { id: 7, name: "Polyethy", grades: ["HDPE", "LDPE", "LLDPE"], color: "bg-timberwolf" },
  { id: 8, name: "Polypropylene", grades: ["Homopolymer", "Copolymer"], color: "bg-timberwolf" },
  { id: 9, name: "Polyvinyl Chloride", grades: ["Rigid PVC", "Flexible PVC"], color: "bg-timberwolf" },
  { id: 10, name: "Polystyrene", grades: ["GPPS", "HIPS"], color: "bg-french-gray" },
  { id: 11, name: "Acrylonitrile Butadiene Styrene", grades: ["Injection Molding", "Extrusion"], color: "bg-french-gray" },
  { id: 12, name: "Polyethylene Terephthalate", grades: ["Bottle Grade", "Fiber Grade"], color: "bg-french-gray" },
];

export default function Dashboard() {
  const scrollToCards = () => {
    const cardsContainer = document.getElementById('cards-container');
    if (cardsContainer) {
      cardsContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <img src='/pic_bg.png' alt="Background" className="absolute inset-0 object-cover w-full h-full" style={{ objectFit: 'cover' }} />

      {/* Blurred glass effect container */}
      <div className="container mx-auto px-4 py-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg max-w-7xl relative z-10">
        <header className="flex items-center justify-between mb-4">
          <img src='/ic_logo.gif' alt="IOCL Logo" className="h-20" />
          <h1 className="text-4xl font-bold text-green-600">INDIA CHEM 2024</h1>
          <img src='/propel_new.jpg' alt="Propel Logo" className="h-20" />
        </header>
        <p className="text-xl text-gray-700 text-center mb-8">Petrochemical Products Showcase</p>
        
        {/* Centered Button */}
        <div className="flex justify-center mb-8">
          <Link href="/form" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg transition hover:bg-green-700">
            Click here to know about IOCL Polymer Grades
          </Link>
        </div>
      </div>
    </div>
  );
}
