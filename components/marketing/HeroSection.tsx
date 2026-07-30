export const HeroSection = () => {
  const words = ["Find", "your", "perfect", "influencers,"];
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-3xl md:text-5xl font-sans leading-snug text-zinc-100">
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block animate-fade-up mr-2"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            \{word}
          </span>
        ))}
        <span
          className="inline-block animate-fade-up bg-linear-to-r from-[#9d94f0] via-[#ea7ba8] to-[#9d94f0] bg-size-[200%_auto] bg-clip-text text-transparent animate-shimmer font-medium"
          style={{ animationDelay: "0.5s" }}
        >
          Instantly
        </span>
      </p>
    </div>
  );
};
