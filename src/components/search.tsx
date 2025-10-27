import Input from "@/components/ui/Input";
import Icon from "../assets/icons/search.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Search({ className }: { className?: string }) {
  return (
    <div className={cn("flex", className)}>
      <Image src={Icon} alt="Search Icon" className="relative -right-0.5" />
      <Input
        className="-ml-6 w-full px-8"
        placeholder="Search for people,tags,folders,spacesand Looms"
      />
    </div>
  );
}
