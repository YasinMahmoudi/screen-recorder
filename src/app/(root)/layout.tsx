import MainNav from "@/components/MainNav";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/assets/globals.css";

const geistSans = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capterra",
  description: "Record and share videos with Capterra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} mx-auto max-w-[1440px] antialiased`}
      >
        <MainNav />
        {children}
      </body>
    </html>
  );
}
