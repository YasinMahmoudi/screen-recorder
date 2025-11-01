import Button from "@/components/ui/Button";
import GoogleIcon from "@/assets/icons/google.svg";
import Image from "next/image";
import Logo from "./Logo";

export default function SignInForm() {
  return (
    <div className="clip-path grid place-items-center">
      <div className="mx-auto max-w-sm rounded-2xl border border-gray-200 bg-white px-6 py-8 text-center shadow">
        <Logo className="mx-auto mb-2.5" />

        <h1 className="text-xl font-bold tracking-[-.8px] md:text-2xl">
          {" "}
          Welcome to{" "}
          <span className="bg-linear-to-tr from-violet-500 to-pink-500 bg-clip-text tracking-wide text-transparent">
            Capterra
          </span>
        </h1>
        <p className="mt-1 text-xs tracking-[-.4px] text-gray-400 md:text-sm">
          Start creating and sharing your first video in a minute
        </p>

        <Button className="mt-6 w-full cursor-pointer rounded-full border border-gray-200 bg-white">
          <Image
            src={GoogleIcon}
            alt="Google Icon"
            width={30}
            height={30}
            className="h-5 w-5"
          />

          <span> Sign in with Google </span>
        </Button>
      </div>
    </div>
  );
}
