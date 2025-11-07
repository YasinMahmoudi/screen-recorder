import { Roboto, Kablammo } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";

const geistSans = Roboto({
  subsets: ["latin"],
});

const kablammo = Kablammo({
  subsets: ["latin"],
});


export default function NotFoundError() {
  return (
    <div className="flex h-dvh items-center justify-center gap-4 p-0 md:p-4">
      <div className="not-found-error w-[min(90%,480px)] rounded-sm px-8 py-8 shadow md:px-2 md:py-4">
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
  );
}
