import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Panel Albayt",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <section className="flex h-screen overflow-hidden">
          <Sidebar />

          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
          
        </section>
      </body>
    </html>
  );
}
