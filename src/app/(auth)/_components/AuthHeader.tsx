import Logo from "@/components/Logo";

export default function AuthHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-b-gray-200 px-4 py-3">
      <Logo />
    </header>
  );
}
