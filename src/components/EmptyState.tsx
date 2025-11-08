import Image from "next/image";
import VideoIcon from "../assets/icons/video.svg";

export default function EmptyState({
  icon = VideoIcon,
  title = "No Videos Available Yet",
  description = "Videos will show up here once added.",
}: {
  icon?: string;
  title?: string;
  description?: string;
}) {
  return (
    <div className="grid place-items-center gap-2 rounded-2xl border border-gray-200 p-8 sm:gap-4 sm:p-10">
      <figure className="asp flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 p-4 sm:h-20 sm:w-20">
        <Image src={icon} alt="Video Icon" width={60} height={60} />
      </figure>

      <article className="mt-2.5 space-y-1.5 text-center sm:mt-5 sm:space-y-2.5">
        <h3 className="text-lg font-semibold sm:text-2xl">
          {title}
        </h3>

        <p className="text-xs font-normal text-gray-400 sm:text-sm">
          {description}
        </p>
      </article>
    </div>
  );
}
