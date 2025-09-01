import type { Metadata } from "next";




export const metadata: Metadata = {
  title: "Sustainable Development ",
  description: "Sustainable Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       
      >
        {children}
      </body>
    </html>
  );
}
