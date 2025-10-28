import VideoCard, { type VideoCardProps } from "@/components/VideoCard";

const videos: VideoCardProps[] = [
  {
    id: "1",
    title: "Video Title For Testing Purposes Only Please Ignore",
    description: "Video Description",
    thumbnail: "/images/thambnail.jpg",
    createdAt: "2022-01-01",
    author: {
      name: "John Doe",
      image: "/images/avatar.jpg",
    },
    views: 100,
    duration: 60,
  },

  {
    id: "2",
    title: "Video Title For Testing Purposes Only Please Ignore",
    description: "Video Description",
    thumbnail: "/images/thambnail.jpg",
    createdAt: "2022-01-01",
    author: {
      name: "John Doe",
      image: "/images/avatar.jpg",
    },
    views: 100,
    duration: 60,
  },

  {
    id: "3",
    title: "Video Title For Testing Purposes Only Please Ignore",
    description: "Video Description",
    thumbnail: "/images/thambnail.jpg",
    createdAt: "2022-01-01",
    author: {
      name: "John Doe",
      image: "/images/avatar.jpg",
    },
    views: 100,
    duration: 60,
  },

  {
    id: "4",
    title: "Video Title For Testing Purposes Only Please Ignore",
    description: "Video Description",
    thumbnail: "/images/thambnail.jpg",
    createdAt: "2022-01-01",
    author: {
      name: "John Doe",
      image: "/images/avatar.jpg",
    },
    views: 100,
    duration: 60,
  },

  {
    id: "5",
    title: "Video Title For Testing Purposes Only Please Ignore",
    description: "Video Description",
    thumbnail: "/images/thambnail.jpg",
    createdAt: "2022-01-01",
    author: {
      name: "John Doe",
      image: "/images/avatar.jpg",
    },
    views: 100,
    duration: 60,
  },

  {
    id: "6",
    title: "Video Title For Testing Purposes Only Please Ignore",
    description: "Video Description",
    thumbnail: "/images/thambnail.jpg",
    createdAt: "2022-01-01",
    author: {
      name: "John Doe",
      image: "/images/avatar.jpg",
    },
    views: 100,
    duration: 60,
  },
];

export default function VideoList() {
  return (
    <div className="mt-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
