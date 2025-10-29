import Search from "@/components/search";
import { cn } from "@/lib/utils";
import SortingSelect from "@/components/SortingSelect";

export default function Header({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "my-4 flex items-center justify-between gap-2 py-2",
        className,
      )}
    >
      <Search className="flex-2 sm:w-sm sm:flex-initial" />

      <SortingSelect />
    </div>
  );
}
