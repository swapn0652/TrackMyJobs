import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Caveat, Indie_Flower } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
});

const indieFlower = Indie_Flower({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-indie",
});

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "Track your job applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${caveat.variable} ${indieFlower.variable}`}>
      <body className="h-screen overflow-hidden font-[Caveat]">

        <div className="flex h-full">

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:block w-[260px] border-r-2 border-black">
            <Sidebar />
          </aside>

          {/* RIGHT SECTION */}
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              {children}
            </main>
          </div>

        </div>

      </body>
    </html>
  );
}
