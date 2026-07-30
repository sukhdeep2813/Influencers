import { BackgroundGlows } from "@/components/marketing/BackgroundGlows";
import CreatorCard from "@/components/marketing/CreatorCard";
import { HeroSection } from "@/components/marketing/HeroSection";
import TestimonialCard from "@/components/marketing/Testimonials";
import { mockTestimonial } from "@/constants/data/mockTestimonials";
import { MOCK_CREATORS } from "@/constants/data/mockCreators";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      <BackgroundGlows />

      {/* Changed pt-26 to pt-24 (standard Tailwind spacing) to ensure it renders */}
      <main className="pt-24">
        <HeroSection />

        {/* Creators Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_CREATORS.map((creator) => (
              <CreatorCard key={creator.id} {...creator} />
            ))}
          </div>
        </section>

        {/* Testimonials Section (Wrapped in a proper structural container) */}
        {/* Testimonials Section */}
        <section className="w-full max-w-7xl mx-auto px-4 pb-24 overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Trusted by top brands and creators
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              See how our marketplace is changing the way sponsorships are
              built.
            </p>
          </div>

          {/* Marquee Wrapper - Hides the horizontal overflow */}
          <div className="flex  gap-8 group">
            {/* First Track (Original Array) */}
            <div className="flex shrink-0 gap-8 animate-marquee group-hover:[animation-play-state:paused]">
              {mockTestimonial.map((item) => (
                <div key={`first-${item.id}`} className="w-87.5 shrink-0">
                  <TestimonialCard {...item} />
                </div>
              ))}
            </div>

            {/* Second Track (Duplicated Array for seamless loop) */}
            <div
              aria-hidden="true"
              className="flex shrink-0 gap-8 animate-marquee group-hover:[animation-play-state:paused]"
            >
              {mockTestimonial.map((item) => (
                <div key={`second-${item.id}`} className="w-87.5 shrink-0">
                  <TestimonialCard {...item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
