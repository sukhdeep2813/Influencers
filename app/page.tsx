import { BackgroundGlows } from "@/components/marketing/BackgroundGlows";
import CreatorCard from "@/components/marketing/CreatorCard";
import { HeroSection } from "@/components/marketing/HeroSection";
import TestimonialCard from "@/components/marketing/Testimonials";
import { mockTestimonial } from "@/constants/data/mockTestimonials";
import { MOCK_CREATORS } from "@/constants/data/mockCreators";
import BentoGrid from "@/components/marketing/BentoGrid";
import WhyChooseUs from "@/components/marketing/WhyChooseUs";
import FAQSection from "@/components/marketing/FAQSection";
import SectionReveal from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative overflow-x-hidden">
      <BackgroundGlows />

      {/* Changed pt-26 to pt-24 (standard Tailwind spacing) to ensure it renders */}
      <main className="pt-24">
        <HeroSection />

        {/* Creators Section */}
        <SectionReveal className="w-full max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_CREATORS.map((creator, idx) => (
              <div
                key={creator.id}
                style={{ animationDelay: `${idx * 80}ms` }}
                className="animate-fade-up"
              >
                <CreatorCard {...creator} />
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Testimonials Section (Wrapped in a proper structural container) */}
        {/* Testimonials Section */}
        <SectionReveal className="w-full max-w-7xl mx-auto px-4 pb-24 overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center rounded-full border border-violet-100 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-600">
              ⭐ Success Stories
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-900">
              Trusted by
              <span className="block bg-linear-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                top brands & creators
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Thousands of successful collaborations powered by one platform.
              Discover why brands and creators choose us to build lasting
              partnerships.
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
        </SectionReveal>

        <SectionReveal className="relative">
          <BentoGrid />
        </SectionReveal>

        {/* ===================== Why Choose Us ===================== */}
        <SectionReveal className="relative">
          <WhyChooseUs />
        </SectionReveal>

        {/* ===================== FAQ ===================== */}
        <SectionReveal className="relative pb-24">
          <FAQSection />
        </SectionReveal>
      </main>
    </div>
  );
}
