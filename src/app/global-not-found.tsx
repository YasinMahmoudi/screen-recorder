import "@/assets/globals.css";
import NotFoundError from "@/components/404";
import type { Metadata } from "next";
import { Kablammo } from "next/font/google";


const kablammo = Kablammo({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        className={`${kablammo.className} mx-auto max-w-[1800px] antialiased`}
      >
        <NotFoundError />
      </body>
    </html>
  );
}
