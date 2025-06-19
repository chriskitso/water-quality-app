// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Water Quality Monitor",
  description: "Real-time water quality monitoring system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-slate-50 min-h-screen antialiased`}
      >
        <header className="bg-teal-700 text-white px-4 py-3 flex justify-between items-center shadow">
          <h1 className="text-xl font-bold">💧 Water Quality System</h1>
          <nav className="space-x-4">
            <a href="/" className="hover:underline">
              Live Logs
            </a>
            <a href="/graph" className="hover:underline">
              Graphs
            </a>
          </nav>
        </header>

        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
