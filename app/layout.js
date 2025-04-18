"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import ClientWrapper from '@/components/Global/ClientWrapper';
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from '../store'; // Ensure this path is correct

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Zendor Home",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className={!isHomePage&&"mt-25"} >
        <Provider store={store}>
          <ClientWrapper>
            {children}
          </ClientWrapper>
          </Provider>
        </main>
        
      </body>
    </html>
  );
}
