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
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
      {/* Background image */}
      <img src='/pic_bg.png' alt="Background" className="absolute inset-0 object-cover w-full h-full" style={{ objectFit: 'cover' }} />

      {/* Blurred glass effect container */}
      <div className="container mx-auto px-4 py-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg max-w-7xl relative z-10">
        <header className="flex items-center justify-between mb-12">
          <img src='/ic_logo.gif' alt="IOCL Logo" className="h-20" />
          <h1 className="text-4xl font-bold text-green-600">INDIA CHEM 2024</h1>
          <img src='/propel_new.jpg' alt="Propel Logo" className="h-20" />
        </header>
        <p className="text-xl text-gray-700 text-center mb-8">Petrochemical Products Showcase</p>

        {/* Scrollable container for cards */}
        <div id="cards-container" className="max-h-[565px] overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className={`hover:shadow-lg transition-shadow rounded-lg ${product.color} p-6`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-800">
                    <span>{product.name}</span>
                    <File className="text-blue-600 h-6 w-6" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Available Grades:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.grades.map((grade, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {grade}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Link href={`/product/${product.id}`} passHref>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Floating Button */}
        <button 
          onClick={scrollToCards} 
          className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      </div>
      </Vortex>
    </div>
  );
}
