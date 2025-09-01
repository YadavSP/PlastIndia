import { FileText, File, Database, Search, GitBranch, Mail, Globe, Link2, Trees } from 'lucide-react';
import Link from "next/link";

const links = [
  {
    title: "Sustainbility Reports",
    icon: FileText,
    href: "https://iocl.com/sustainability",
    iconColor: "#FF6347", // Tomato red for Sustainability
  },
  {
    title: "Environment days 2025",
    icon: Trees,
    href: "./Environment_Days_2025.pdf", 
    iconColor: "#32CD32", // Lime green for Annual Reports
  }
  ,
  {
    title: "BRSR",
    icon: Database,
    href: "https://iocl.com/business-responsibility-report",
    iconColor: "#1E90FF", // Dodger blue for business data
  },
  {
    title: "Sustainbility Highlights",
    icon: Search,
    href: "https://iocl.com/uploads/IOCL-Sustainability-Highlights-2022-23.pdf",
    iconColor: "#FFD700", // Golden yellow for highlights
  },
  {
    title: "Policies",
    icon: GitBranch,
    href: "https://ioclintranet.indianoil.co.in/web/business-development-re-sd-department/achive",
    iconColor: "#8A2BE2", // BlueViolet for Policies
  },
  {
    title: "NewsLetters",
    icon: Mail,
    href: "https://ioclintranet.indianoil.co.in/web/business-development-re-sd-department/newsletter",
    iconColor: "#FF4500", // OrangeRed for newsletters
  },
  {
    title: "Net Zero",
    icon: Globe,
    href: "https://iocl.com/pages/NetZeroone",
    iconColor: "#00FA9A", // MediumSpringGreen for Net Zero
  },
  {
    title: "Carbon Neutral Portal",
    icon: Link2,
    href: "https://rhqapp/cone/",
    iconColor: "#DC143C", // Crimson for the portal link
  },
];

export function CommonLinks() {
  return (
    <div className="bg-[#0A2167] p-6 rounded-lg">
      {/* <h2 className="text-xl text-center font-semibold text-white mb-6"> Links</h2> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer" // Security best practices
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors"
          >
            <link.icon className="h-8 w-8" style={{ color: link.iconColor }} />
            <span className="text-sm text-center font-medium text-gray-900">
              {link.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
