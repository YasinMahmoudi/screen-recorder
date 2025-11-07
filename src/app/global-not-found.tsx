import "@/assets/globals.css";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import type { Metadata } from "next";
import { Roboto, Kablammo } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const geistSans = Roboto({
  subsets: ["latin"],
});

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
        <div className="flex h-dvh items-center justify-center gap-4 p-0 md:p-4">
          <div className="shadow rounded-sm px-8 py-8 md:px-2 md:py-4 w-[min(90%,480px)] not-found-error">
            <h1 className="font-semibold text-balance text-gray-800 sm:text-xl">
              <span
                className={`${kablammo.className} bg-linear-to-br from-violet-500 to-rose-400 bg-clip-text text-5xl text-transparent`}
              >
                404
              </span>{" "}
              &mdash; Page Not Found
            </h1>
            <Divider className="border-dashed" />
            <p
              className={`${geistSans.className} mt-4 text-sm font-medium text-gray-800 sm:text-base`}
            >
              This page does not exist !
            </p>
            <Button
              className={`${geistSans.className} mt-4 bg-violet-500 text-violet-50`}
            >
              <Link href="/"> Back to Home </Link>
            </Button>
          </div>

          <figure className="hidden md:block">
            <Image
              src="/not-found.svg"
              alt="Not Found Image"
              width={500}
              height={500}
            />
          </figure>
        </div>
      </body>
    </html>
  );
}
