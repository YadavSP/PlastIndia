"use client";
import { useEffect, useState } from "react";
import { MessageCard } from "./components/message-card";
import { AnnouncementCarousel } from "./components/announcement-carousel";
import { FacilityGrid } from "./components/facility-grid";
import { CommonLinks } from "./components/common-links";
import { Navbar } from "./components/navbar";

export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleOverlayClick = () => {
    setShowPopup(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 via-teal-300 to-blue-200">
      <Navbar />
      <div className="px-4 py-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col h-full">
            <MessageCard />
          </div>
          <div className="md:col-span-3 flex flex-col h-full">
            <AnnouncementCarousel />
          </div>
        </div>

        <FacilityGrid />
        <CommonLinks />
      </div>

      {/* Image Popup Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white p-4 rounded-xl shadow-lg max-w-md w-full relative"
            onClick={stopPropagation}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-3xl font-bold leading-none"
            >
              &times;
            </button>
            <img
              src="/Earth_day_poster_page.jpg"
              alt="Popup"
              
              className="w-full max-h-[650px] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
