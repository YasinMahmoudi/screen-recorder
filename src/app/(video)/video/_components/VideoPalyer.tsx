
export default function VideoPalyer() {
  return (
    <div className="aspect-video w-full rounded-xl brightness-50">
      <iframe
        className="z-50 h-full w-full rounded-xl border-0"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
        loading="lazy"
        title="Video Player"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
