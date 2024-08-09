import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/lib/provider";
import Navbar from "@/components/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Jay Expense Tracker",
    default: "Jay Expense Tracker",
  },
  description: "John Attai Yinusa Expense Tracker",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; John Atta Yinusa</p>
          </footer>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
