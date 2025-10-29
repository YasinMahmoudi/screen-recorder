import React, { Activity } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import LinkIcon from "../assets/icons/link.svg";
import CheckIcon from "../assets/icons/checkmark.svg";

export default function CopyLinkButton({ id }: { id: string }) {
  const [isCopied, setIsCopied] = React.useState(false);

  function handleCopyLink(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  return (
    <>
      <Activity mode={isCopied ? "hidden" : "visible"}>
        <Button
          onClick={handleCopyLink}
          className="h-6 w-6 cursor-pointer rounded-full bg-white p-[3px] hover:bg-white/90"
          size="icon"
        >
          <Image src={LinkIcon} alt="Link Icon" width={18} height={18} />
        </Button>
      </Activity>

      <Activity mode={isCopied ? "visible" : "hidden"}>
        <Button
          className="h-6 w-6 cursor-default rounded-full bg-white p-[3px]"
          size="icon"
        >
          <Image src={CheckIcon} alt="Check Icon" width={18} height={18} />
        </Button>
      </Activity>
    </>
  );
}
