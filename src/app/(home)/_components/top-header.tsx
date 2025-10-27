import Button from "@/components/ui/Button";
import Image from "next/image";
import UploadIcon from "../../../assets/icons/upload.svg";
import Recordicon from "../../../assets/icons/record.svg";

export default function TopHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="space-y-2">
        <span className="text-[10px] font-medium text-gray-400 sm:text-sm">
          {" "}
          Public Assets{" "}
        </span>
        <h3 className="text-base font-bold text-gray-900 capitalize sm:text-3xl">
          {" "}
          All Videos{" "}
        </h3>
      </div>

      <div className="flex gap-2 sm:gap-4">
        <Button
          variant="outline"
          className="h-10 w-10 cursor-pointer rounded-full border-gray-300 sm:h-auto sm:w-auto hover:bg-gray-50 hover:border-transparent"
        >
          <Image src={UploadIcon} alt="Upload Icon" />
          <span className="hidden sm:block">Upload a video</span>
        </Button>

        <Button className="h-10 w-10 cursor-pointer rounded-full bg-violet-600 hover:bg-violet-500 text-pink-50 sm:h-auto sm:w-auto">
          <Image src={Recordicon} alt="Video Icon" />
          <span className="hidden sm:block">Record a video</span>
        </Button>
      </div>
    </div>
  );
}
