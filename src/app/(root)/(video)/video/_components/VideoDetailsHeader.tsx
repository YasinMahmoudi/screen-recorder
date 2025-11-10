"use client";

import EyeIcon from "@/assets/icons/eye.svg";
import CopyLinkButton from "@/components/CopyLinkButton";
import SelectWithIcon from "@/components/SelectWithIcon";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Modal from "@/components/ui/Modal";
import { deleteVideo, updateVideoVisibility } from "@/lib/actions/video";
import { differenceDate } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

type VideoDetailsHeaderProps = {
  id: string;
  videoId: string;
  title: string;
  visibility: "public" | "private";
  description?: string;
  thambnail?: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    image: string | null;
  } | null;
};

export default function VideoDetailsHeader({
  title,
  visibility,
  user,
  createdAt,
  videoId,
  thambnail,
}: VideoDetailsHeaderProps) {
  const uploadDatePassed = differenceDate(createdAt);

  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <div className="space-y-1.5">
        <h1 className="xs:text-lg line-clamp-1 text-base font-bold sm:text-xl md:text-2xl lg:text-3xl">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          {user && (
            <>
              <Image
                src={user.image!}
                alt={`User Avatar ${user.name}`}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
              <span className="text-xs tracking-[-.4px] text-gray-400 sm:text-sm">
                {" "}
                {user.name}{" "}
              </span>
            </>
          )}

          <div className="h-1 w-1 rounded-full bg-gray-500"></div>
          <span className="text-xs tracking-[-.4px] text-gray-400 sm:text-sm">
            {" "}
            {uploadDatePassed}
          </span>
        </div>
      </div>

      <div className="mt-4 flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-stretch md:mt-0 md:gap-4">
        <CopyLinkButton id={videoId} />

        <div className="flex items-center gap-2 md:gap-4">
          <DeleteVideoModal deleteId={videoId} thambnailUrl={thambnail!} />
          <Divider mode="vertical" />
          <VisibilitySelect videoId={videoId} selectedVisibility={visibility} />
        </div>
      </div>
    </div>
  );
}

function DeleteVideoModal({
  deleteId,
  thambnailUrl,
}: {
  deleteId: string;
  thambnailUrl: string;
}) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  function handleDeleteVideo() {
    startTransition(async () => {
      await deleteVideo(deleteId, thambnailUrl);

      toast.success("Video deleted successfully");

      router.push("/");
    });
  }

  return (
    <Modal>
      <Modal.Trigger openId="delete-video">
        <Button className="cursor-pointer rounded-full border border-gray-200 bg-white px-2.5 text-xs text-rose-500 hover:bg-rose-500 hover:text-rose-50 sm:px-4 sm:text-sm">
          Delete video
        </Button>
      </Modal.Trigger>

      <Modal.Content openId="delete-video">
        <h4 className="text-lg font-semibold tracking-[-.8px]">
          {" "}
          Are you sure delete this video ?{" "}
        </h4>
        <p className="mt-1 text-sm font-normal tracking-[-.8px] text-gray-600">
          {" "}
          By deleting this video , it&apos;s competly removed from your profile
          and our database and this action can not be undo ! .{" "}
        </p>

        <div className="mt-4 flex justify-end gap-4">
          <Modal.Cancel>
            <Button className="cursor-pointer text-gray-900 hover:bg-gray-200">
              Cancle
            </Button>
          </Modal.Cancel>

          <Button
            onClick={handleDeleteVideo}
            disabled={isPending}
            className="cursor-pointer bg-rose-500 text-rose-50 hover:bg-rose-400"
          >
            {isPending ? <Spinner /> : "Delete"}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}

function VisibilitySelect({
  selectedVisibility,
  videoId,
}: {
  selectedVisibility?: "public" | "private";
  videoId: string;
}) {
  async function handleUpdateVisibility(visibility: "public" | "private") {
    await updateVideoVisibility(videoId, visibility);

    toast.success("Visibility updated successfully");
  }

  return (
    <SelectWithIcon
      triggerClassName="w-auto sm:w-[180px]"
      iconSrc={EyeIcon}
      selectLabel="Manage Visibility"
      value={selectedVisibility}
      onChange={(value: unknown) =>
        handleUpdateVisibility(value as unknown as "public" | "private")
      }
      items={[
        {
          label: "Public",
          value: "public",
        },
        {
          label: "Private",
          value: "private",
        },
      ]}
    />
  );
}
