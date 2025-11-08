"use client";

import Field from "@/components/Field";
import FileInput from "@/components/FileInput";
import Button from "@/components/ui/Button";
import { useFileInput } from "@/hooks/useFileInput";
import {
  getThumbnailUploadUrl,
  getVideoUploadUrl,
  saveVideoDetails,
} from "@/lib/actions/video";

import * as yup from "yup";

import { useForm, Resolver, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadFileToBunny } from "@/lib/uploadFileToBunny";
import Spinner from "@/components/Spinner";

const uploadSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  video: yup.mixed().required("Video is required"),
  thumbnail: yup.mixed().required("Thumbnail is required"),
  visibility: yup.string().required("Visibility is required"),
});

type Visibility = "public" | "private";

interface FormValuesType {
  title: string;
  description: string;
  video: File;
  thumbnail: File;
  visibility: Visibility;
}

const defaultValues: FormValuesType = {
  title: "",
  description: "",
  thumbnail: new File([], ""),
  video: new File([], ""),
  visibility: "public",
};

export default function Page() {
  const router = useRouter();
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const video = useFileInput(500 * 1024 * 1024);
  const thumbnail = useFileInput(10 * 1024 * 1024);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormValuesType>({
    resolver: yupResolver(uploadSchema) as unknown as Resolver<FormValuesType>,
    defaultValues,
  });

  useEffect(() => {
    if (video.duration !== null) {
      setVideoDuration(video.duration);
    }
  }, [video.duration]);

  useEffect(() => {
    const checkForRecordedVideo = async () => {
      try {
        const stored = sessionStorage.getItem("recordedVideo");
        if (!stored) return;

        const { url, name, type, duration } = JSON.parse(stored);
        const blob = await fetch(url).then((res) => res.blob());
        const file = new File([blob], name, { type, lastModified: Date.now() });

        if (video.inputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          video.inputRef.current.files = dataTransfer.files;

          const event = new Event("change", { bubbles: true });
          video.inputRef.current.dispatchEvent(event);

          video.handleFileChange({
            target: { files: dataTransfer.files },
          } as ChangeEvent<HTMLInputElement>);
        }

        if (duration) setVideoDuration(duration);

        sessionStorage.removeItem("recordedVideo");
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Error loading recorded video:", err);
      }
    };

    checkForRecordedVideo();
  }, [video]);

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    try {
      const {
        videoId,
        uploadUrl: videoUploadUrl,
        accessKey: videoAccessKey,
      } = await getVideoUploadUrl();

      if (!videoUploadUrl || !videoAccessKey)
        throw new Error("Failed to get video upload credentials");

      await uploadFileToBunny(
        video.file as File,
        videoUploadUrl,
        videoAccessKey,
      );

      const {
        uploadUrl: thumbnailUploadUrl,
        cdnUrl: thumbnailCdnUrl,
        accessKey: thumbnailAccessKey,
      } = await getThumbnailUploadUrl(videoId as string);

      if (!thumbnailUploadUrl || !thumbnailCdnUrl || !thumbnailAccessKey)
        throw new Error("Failed to get thumbnail upload credentials");

      await uploadFileToBunny(
        thumbnail.file as File,
        thumbnailUploadUrl,
        thumbnailAccessKey,
      );

      await saveVideoDetails({
        videoId: videoId as string,
        thumbnailUrl: thumbnailCdnUrl,
        duration: videoDuration,
        title: data.title,
        description: data.description,
        visibility: data.visibility,
        tags: [],
      });

      router.push(`/video/${videoId}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="mx-auto mt-8 w-[min(90%,600px)]">
      <h1 className="text-2xl font-semibold tracking-[-.8px]">Uplaod Video</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-8 space-y-6 rounded-2xl bg-white px-3 py-6 shadow-md">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Field
                label="Title"
                id="title"
                placeholder="Enter a title for your video"
                control={control}
                {...field}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Field
                label="Description"
                id="description"
                placeholder="Add a description for your video"
                as="textarea"
                control={control}
                {...field}
              />
            )}
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

          <Controller
            name="visibility"
            control={control}
            render={({ field }) => (
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
                control={control}
                {...field}
              />
            )}
          />

          <Button
            className="h-10! w-full cursor-pointer rounded-full bg-violet-500 text-violet-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Uplaod video"}
          </Button>
        </div>
      </form>
    </div>
  );
}
