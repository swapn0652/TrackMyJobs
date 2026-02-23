import type { Metadata } from "next";
import "./globals.css";
import { Caveat, Indie_Flower } from "next/font/google";
import AuthGuard from "@/components/auth/AuthGuards";
import AppLayoutWrapper from "@/components/layout/AppLayoutWrapper";

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
        <AuthGuard>
          <AppLayoutWrapper>{children}</AppLayoutWrapper>
        </AuthGuard>
      </body>
    </html>
  );
}