import Image from "next/image";
import { useState } from "react";
import { Carousel } from "@/components/ui/carousel";

const announcements = [
  {
    alt: "",
    src: "/Sustainability__IndianOil_1.png",
  },
];

export function AnnouncementCarousel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");

  // Function to open the modal
  const openModal = (src, alt) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Carousel>
       
        {announcements.map((item, index) => (
          <div
            key={index}
            className="relative w-full overflow-hidden rounded-lg bg-gray-200"
            style={{ aspectRatio: "3 / 0.80" }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-fill cursor-pointer" // Add cursor-pointer to indicate it's clickable
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              onClick={() => openModal(item.src, item.alt)} // Open modal on click
            />
          </div>
        ))}
      </Carousel>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={closeModal} // Close the modal when clicking outside the image
        >
          <div
            className="relative bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside the image
          >
            <Image
              src={modalImageSrc}
              alt={modalImageAlt}
              width={1400}
              height={1000}
              className="object-contain" // Ensures the image is contained within the modal
            />
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold"
              onClick={closeModal}
            >
              &times; {/* Close button */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
