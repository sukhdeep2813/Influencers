type DashboardHeroProps = {
  brandName: string;
  activeCampaigns: number;
  unreadMessages: number;
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export default function DashboardHero({
  brandName,
  activeCampaigns,
  unreadMessages,
}: DashboardHeroProps) {
  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white px-5 py-6 shadow-sm sm:px-7 sm:py-7 lg:px-8">
      {/* Subtle decorative glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-56 w-56 rounded-full bg-orange-50/50 blur-3xl" />

      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        {/* Left content */}
        <div className="min-w-0">
          {/* Label */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50/80 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-700">
              Brand workspace
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[42px]">
            {getGreeting()}, <span className="text-slate-700">{brandName}</span>
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-[15px]">
            Manage your campaigns, discover the right creators, and keep your
            collaborations moving forward.
          </p>

          {/* Quick stats */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <HeroStat value={activeCampaigns} label="Active campaigns" />

            <span className="hidden h-6 w-px bg-slate-200 sm:block" />

            <HeroStat value={unreadMessages} label="Unread messages" />
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col lg:items-end">
          <a
            href="#recommended-creators"
            className="
              inline-flex min-h-11 w-full
              items-center justify-center gap-2
              rounded-xl
              bg-slate-950
              px-5
              text-sm font-semibold
              text-white
              shadow-lg shadow-slate-950/10
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-slate-800
              hover:shadow-xl
              sm:w-auto
            "
          >
            <span className="text-lg leading-none text-orange-400">+</span>
            Find & recruit creators
          </a>

          <p className="hidden text-right text-[11px] text-slate-400 sm:block">
            Build your next campaign
          </p>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 py-2">
      <span className="text-lg font-bold tracking-tight text-slate-950">
        {value}
      </span>

      <span className="text-xs font-medium text-slate-500">{label}</span>
    </div>
  );
}
