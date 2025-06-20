// src/app/layout.tsx
import "./globals.css";
import Link from "next/link"; // ✅ Using Next.js <Link> instead of <a>

export const metadata = {
  title: "Water Quality Monitor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-slate-50 min-h-screen antialiased">
        <header className="bg-teal-700 text-white px-4 py-3 flex justify-between items-center shadow">
          <h1 className="text-xl font-bold">💧 Water Quality System</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">Live Logs</Link>
            <Link href="/graph" className="hover:underline">Graphs</Link>
          </nav>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
