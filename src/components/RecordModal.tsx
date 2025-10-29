import Modal from "@/components/ui/Modal";
import MicroPhoneIcon from "../assets/icons/microphone.svg";
import RecordIcon from "../assets/icons/record.svg";
import VideoLineIcon from "../assets/icons/video-line.svg";
import Button from "./ui/Button";


import SelectWithIcon from "@/components/SelectWithIcon";
import Image from "next/image";

export default function RecordModal() {
  return (
    <Modal>
      <Modal.Trigger openId="record-modal">
        <Button className="h-10 w-10 cursor-pointer rounded-full bg-violet-600 text-pink-50 hover:bg-violet-500 sm:h-auto sm:w-auto">
          <Image src={RecordIcon} alt="Video Icon" />
          <span className="hidden sm:block">Record a video</span>
        </Button>
      </Modal.Trigger>
      <Modal.Content openId="record-modal">
        <div>
          <p className="mb-2 text-sm font-medium tracking-[-.8px] text-gray-500">
            Video settings
          </p>
          <VideoSettingsSelect />
        </div>

        <div>
          <p className="mt-4 mb-2 text-sm font-medium tracking-[-.8px] text-gray-500">
            Record settings
          </p>
          <div className="flex items-center gap-3">
            <Button className="bg-violet-100" size="icon">
              <Image
                src={MicroPhoneIcon}
                width={20}
                height={20}
                alt="Microphone Icon"
              />
            </Button>
            <VideoSettingsSelect />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button className="bg-violet-100" size="icon">
              <Image
                src={VideoLineIcon}
                width={20}
                height={20}
                alt="Video Line Icon"
              />
            </Button>
            <VideoSettingsSelect />
          </div>{" "}
        </div>

        <Button className="mt-6 h-12 w-full cursor-pointer rounded-full bg-violet-500 text-violet-50 hover:bg-violet-400">
          Start recording
        </Button>
      </Modal.Content>
    </Modal>
  );
}

function VideoSettingsSelect() {
  return (
    <SelectWithIcon
      triggerClassName="w-full h-11!"
      items={[
        {
          label: "Full Screen",
          value: "full-screen",
        },
        {
          label: "Window",
          value: "window",
        },
        {
          label: "Current Tab",
          value: "current-tab",
        },
        {
          label: "Camera Only",
          value: "camera-only",
        },
      ]}
    />
  );
}
