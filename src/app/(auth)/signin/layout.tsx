import "@/assets/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import AuthHeader from "../_components/AuthHeader";

const geistSans = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capterra | Sign In",
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
        className={`${geistSans.className} mx-auto grid min-h-dvh max-w-[1440px] antialiased`}
      >
        <AuthHeader />
        {children}
      </body>
    </html>
  );
}
