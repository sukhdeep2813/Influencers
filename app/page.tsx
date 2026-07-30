import { BackgroundGlows } from "@/components/marketing/BackgroundGlows";
import CreatorCard from "@/components/marketing/CreatorCard";
import { HeroSection } from "@/components/marketing/HeroSection";
import { MOCK_CREATORS } from "@/constants/data/mockCreators";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. The Hero Section goes at the very top */}
      <BackgroundGlows />
      <HeroSection />

      {/* 2. Other landing page sections will flow below it */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-20 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_CREATORS.map((creator) => {
            return <CreatorCard key={creator.id} {...creator} />;
          })}
        </div>
      </section>
      {/* <Testimonials /> */}
    </div>
  );
}
