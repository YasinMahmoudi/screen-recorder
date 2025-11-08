import Modal from "@/components/ui/Modal";
import RecordIcon from "../assets/icons/record.svg";
import UploadIcon from "../assets/icons/upload.svg";

import Button from "./ui/Button";

import { useScreenRecording } from "@/hooks/useScreenRecording";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function RecordModal() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    isRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
    startRecording,
    stopRecording,
    resetRecording,
  } = useScreenRecording();

  const closeModal = () => {
    resetRecording();
  };

  const handleStart = async () => {
    await startRecording();
  };

  const recordAgain = async () => {
    resetRecording();
    await startRecording();
    if (recordedVideoUrl && videoRef.current)
      videoRef.current.src = recordedVideoUrl;
  };

  const goToUpload = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    sessionStorage.setItem(
      "recordedVideo",
      JSON.stringify({
        url,
        name: "screen-recording.webm",
        type: recordedBlob.type,
        size: recordedBlob.size,
        duration: recordingDuration || 0,
      }),
    );
    router.push("/upload");
    closeModal();
  };

  return (
    <Modal>
      <Modal.Trigger openId="record-modal">
        <Button className="h-10 w-10 cursor-pointer rounded-full bg-violet-600 text-pink-50 hover:bg-violet-500 sm:h-auto sm:w-auto">
          <Image src={RecordIcon} alt="Video Icon" />
          <span className="hidden sm:block">Record a video</span>
        </Button>
      </Modal.Trigger>
      <Modal.Content openId="record-modal" onClose={closeModal}>
        <h3 className="mb-4 text-xl font-bold">Screen Recording</h3>

        <section>
          {isRecording ? (
            <article>
              <span>Recording in progress...</span>
            </article>
          ) : recordedVideoUrl ? (
            <video ref={videoRef} src={recordedVideoUrl} controls />
          ) : (
            <p>Click record to start recording </p>
          )}
        </section>

        <div className="mt-6 flex items-center justify-center gap-4">
          {!isRecording && !recordedVideoUrl && (
            <Button
              className="my-2 cursor-pointer rounded-full bg-violet-500 text-violet-50 hover:bg-violet-400"
              onClick={handleStart}
              size="lg"
            >
              <Image src={RecordIcon} alt="record" width={16} height={16} />
              Start recording
            </Button>
          )}
          {isRecording && (
            <Button
              className="my-2 cursor-pointer rounded-full bg-orange-500 text-orange-50 hover:bg-orange-400"
              onClick={stopRecording}
              size="lg"
            >
              <div className="h-4 w-4 animate-pulse rounded-full bg-orange-50" />
              Stop recording
            </Button>
          )}
          {recordedVideoUrl && (
            <>
              <Button
                onClick={recordAgain}
                className="cursor-pointer rounded-full bg-gray-800 text-gray-50 hover:bg-gray-700"
              >
                Record Again
              </Button>
              <Button
                onClick={goToUpload}
                className="my-2 cursor-pointer rounded-full bg-violet-500 text-violet-50 hover:bg-violet-400"
              >
                <Image
                  src={UploadIcon}
                  alt="Upload"
                  width={16}
                  height={16}
                  className="invert"
                />
                Continue to Upload
              </Button>
            </>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
}
