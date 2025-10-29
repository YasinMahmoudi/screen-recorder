import CopyLinkButton from "@/components/CopyLinkButton";
import SelectWithIcon from "@/components/SelectWithIcon";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Image from "next/image";
import React from "react";
import EyeIcon from "@/assets/icons/eye.svg";

export default function VideoDetailsHeader() {
  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <div className="space-y-1.5">
        <h1 className="xs:text-lg text-base line-clamp-1 font-bold sm:text-xl md:text-2xl lg:text-3xl">
          Team Update - Sprint Planning Meeting
        </h1>
        <div className="flex items-center gap-2">
          <Image
            src="/images/avatar.jpg"
            alt="Avatar"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-xs tracking-[-.4px] text-gray-400 sm:text-sm">
            {" "}
            Yasin Mahmoudi{" "}
          </span>

          <div className="h-1 w-1 rounded-full bg-gray-500"></div>
          <span className="text-xs tracking-[-.4px] text-gray-400 sm:text-sm">
            {" "}
            3 days ago
          </span>
        </div>
      </div>

      <div className="mt-4 flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-stretch md:mt-0 md:gap-4">
        <CopyLinkButton id={"12"} />

        <div className="flex items-center gap-2 md:gap-4">
          <DeleteVideoButton />
          <Divider mode="vertical" />
          <VisibilitySelect />
        </div>
      </div>
    </div>
  );
}

function DeleteVideoButton() {
  return (
    <Button className="cursor-pointer rounded-full border border-gray-200 bg-white text-rose-500 hover:bg-rose-500 hover:text-rose-50 text-xs sm:text-sm px-2.5 sm:px-4 ">
      Delete video
    </Button>
  );
}

function VisibilitySelect() {
  return (
    <SelectWithIcon
      triggerClassName="w-auto sm:w-[180px]"
      iconSrc={EyeIcon}
      selectLabel="Manage Visibility"
      items={[
        {
          label: "Publice",
          value: "publice",
        },
        {
          label: "Private",
          value: "private",
        },
      ]}
    />
  );
}
