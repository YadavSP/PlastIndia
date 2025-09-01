import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export function MessageCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Main Card */}
      <Card className="bg-gradient-to-r from-[#0A2167] to-[#003366] text-white shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-gradient">
            From the Desk of ED (SD)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {/* Image */}
          <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <Image
              src="/ED_Pic.jpg"
              alt="Director Portrait"
              fill
              className="object-cover object-center"
            />
          </div>
          
          {/* Director's Name */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-1">Mr. Pravin Dongre</h3>
           
          </div>
          
          {/* Button to Open Modal */}
          <Button
            variant="outline"
            className="bg-orange-500 text-black border-white hover:bg-green-600 hover:border-black-600 hover:text-white font-medium px-6 py-2 rounded-lg transition duration-300"
            onClick={openModal}
          >
            Read Full Message
          </Button>
        </CardContent>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          onClick={closeModal} // Close the modal when clicking outside the image
        >
          <div
            className="relative bg-white p-8 max-w-6xl w-full rounded-2xl shadow-lg animate__animated animate__fadeIn animate__faster"
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside the content
          >
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              HOD Message
            </h2>
                      <p className="text-gray-700 text-base leading-relaxed mb-4 text-justify">
            At a transformative juncture in the global energy landscape, IndianOil is steadfast in its commitment to balancing the growing demand for fossil fuels with the urgent
            need for greener, more sustainable alternatives. The Sustainable Development (SD)
            Department is at the forefront of this transition, championing initiatives that not only drive IndianOil&apos;s ambitious goal of achieving Net Zero operational emissions
            by 2046 but also ensuring sustainability embedded with operations and processes. Our push towards Net Zero is in alignment with India&apos;s Panchamrit goals and underscores
            company&apos;s dedication to reduce Scope-1 and Scope-2 emissions while reshaping our energy portfolio. <br />
            Rooted in its establishment in early 2010s, Sustainable Development department has evolved into a robust entity driving IndianOil&apos;s sustainability agenda. Our key responsibilities
            include establishing IndianOil as a leader in the sustainability domain by minimizing our environmental impact. Our team works on integrating sustainability into operations,
            setting industry benchmarks. We also focus on policy development and implementation, while serving as the nodal department for IndianOil&apos;s Net Zero goal and participating in
            government sustainability related initiatives such as the Green Credit Programme and the Carbon Credit Trading Scheme among other. <br />
            Corporate Sustainability disclosures play a crucial role as we compile, analyze, and report on various aspects of sustainability such as emissions, water management,
            waste metrics, biodiversity, amongst others to ensure transparency and accountability with stakeholders. Preparing disclosures including SEBI&apos;s Business Responsibility
            & Sustainability Reporting (BRSR), Sustainability Report, Integrated Annual Report and showcasing the company&apos;s sustainability initiatives on platforms like Dow Jones
            Sustainability Indices, Carbon Disclosure Project, and various renowned sustainability related awards. Additionally, we emphasize capacity building and empowering company
            by providing divisions with access to sustainability related guidelines, policies, webinars, corporate environment related studies, and monthly newsletter across IndianOil.
            Further, we are the nodal department for implementing Govt of India&apos;s Life initiative, Lifecycle Assessment of IndianOil&apos;s products, Zero waste to landfill and water neutrality
            across the company. <br />
            The SD Department&apos;s relentless efforts have earned IndianOil recognition as India&apos;s top-ranked Oil and Gas Company in the S&P Dow Jones Sustainability Indices 2023 and
            a leader in Bloomberg&apos;s NEF rankings. These accolades reflect our dedication to responsible growth and environmental stewardship. <br />
            Sustainability is not a solitary endeavor. It requires collective action and collaboration across all divisions of IndianOil. As sustainability partners, we value your
            insights and feedback to refine processes and adapt to the dynamic needs of a rapidly changing world. Together, we can achieve our shared objective of a sustainable future,
            ensuring IndianOil remains synonymous with trust, innovation, and environmental responsibility.
            <br />
            <div className="text-right font-bold">
              Regards,<br />
              Pravin Dongre, ED(SD)
            </div>
          </p>

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-black text-3xl font-bold"
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

