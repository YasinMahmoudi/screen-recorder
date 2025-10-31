import Image from "next/image";

export default function AuthImage() {
  return (
    <figure className="relative hidden md:block">
      <Image
        src="/images/auth-image.svg"
        alt="Auth Image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="eager"
      />
    </figure>
  );
}
