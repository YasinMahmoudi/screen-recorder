"use client";

import Field from "@/components/Field";
import FileInput from "@/components/FileInput";
import Button from "@/components/ui/Button";
import { useFileInput } from "@/hooks/useFileInput";

export default function Page() {
  const video = useFileInput(500 * 1024 * 1024);
  const thumbnail = useFileInput(10 * 1024 * 1024);

  return (
    <div className="mx-auto mt-8 w-[min(90%,600px)]">
      <h1 className="text-2xl font-semibold tracking-[-.8px]">Uplaod Video</h1>

      <div className="my-8 space-y-6 rounded-2xl bg-white px-3 py-6 shadow-md">
        <Field
          label="Title"
          id="title"
          placeholder="Enter a title for your video"
        />

        <Field
          label="Description"
          id="description"
          placeholder="Add a description for your video"
          as="textarea"
        />

        <FileInput
          label="Video"
          id="video"
          type="video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
        />

        <FileInput
          label="Thumbnail"
          id="thumbnail"
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
        />

        <Field
          label="Visibility"
          id="visibility"
          as="select"
          options={[
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

        <Button className="h-10! w-full cursor-pointer rounded-full bg-violet-500 text-violet-50">
          Uplaod video
        </Button>
      </div>
    </div>
  );
}
