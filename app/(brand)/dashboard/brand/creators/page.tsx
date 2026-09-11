import DashboardHeader from "@/app/(brand)/dashboard/brand/components/dashboard-header";
import CreatorDiscovery from "./components/creator-discovery";
import { creators } from "@/app/(brand)/dashboard/brand/creators/data/creator-data";

export default function FindCreatorsPage() {
  return (
    <div className="min-h-screen bg-[#f3efe4] text-[#1c1b1f]">
      <DashboardHeader />
      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <CreatorDiscovery creators={creators} />
      </main>
    </div>
  );
}
