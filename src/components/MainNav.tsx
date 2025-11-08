import Logo from "@/components/Logo";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";

export default function MainNav() {
  return (
    <header className="flex items-center justify-between border-b border-b-gray-200 px-4 py-3">
      <Logo />

      <UserAvatar />
    </header>
  );
}
