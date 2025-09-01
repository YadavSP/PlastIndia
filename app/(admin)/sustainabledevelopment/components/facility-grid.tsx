import Image from "next/image";
import { MultiItemCarousel } from "@/components/ui/multi-item-carousel";

const facilities = [
   { title: "Sustainibilty Report FY 2024-25", image: "/banner/sustainability_report_24_25.png",  pdf: "/banner/Final_SR_2024-25.pdf",  },
  { title: "Please Participate in SEE 2025", image: "/banner/see2025.png" },
  { title: "Corporte Climate ambition committee meeting at EKN Office", image: "/banner/ekn.jpg" },
  { title: "Winner of Environment Day Essay Competition", image: "/banner/D13_2.jpg" },
  { title: "Winner of Environment Day Essay Competition", image: "/banner/D24_1.jpg" },
  { title: "Winner of Environment Day Essay Competition", image: "/banner/D59_3.jpg" },
  { title: "Winner of Environment Day Essay Competition", image: "/banner/D77_C3.jpg" },
  { title: "Winner of Environment Day Essay Competition", image: "/banner/D6_C2.jpg" },
  { title: "", image: "/banner/D13_2.jpg" }
];

export function FacilityGrid() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Photos</h2>
      <MultiItemCarousel itemsPerSlide={4}>
        {facilities.map((facility, index) => (
          <a
            key={index}
            href={facility.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full overflow-hidden rounded-lg"
            style={{ height: "200px" }} // Adjust the height as needed
          >
            <Image
              src={facility.image}
              alt={facility.title}
              fill
              className="object-fill" // Stretch the image to fill the container
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 text-white font-medium">
                {facility.title}
              </div>
            </div>
          </a>
        ))}
      </MultiItemCarousel>
    </div>
  );
}
