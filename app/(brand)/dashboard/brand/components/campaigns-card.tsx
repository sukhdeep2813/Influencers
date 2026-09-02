import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Users,
} from "lucide-react";
import {
  Campaign,
  CampaignStatus,
  Prisma,
} from "../../../../../generated/prisma";

// 1. Extend the Prisma type in case you include the creators relation later
type CampaignWithCreators = Prisma.CampaignGetPayload<{
  include: {
    creators: {
      include: {
        creator: true;
      };
    };
  };
}>;
type CampaignsCardProps = {
  campaigns: CampaignWithCreators[];
};

// 2. Map Prisma Database ENUMs to your UI styles
const getStatusConfig = (status: CampaignStatus) => {
  switch (status) {
    case "LIVE":
    case "COMPLETED":
      return {
        wrapper: "border-emerald-200 bg-emerald-50 text-emerald-700",
        dot: "bg-emerald-500",
        label: "Live",
      };
    case "IN_REVIEW":
      return {
        wrapper: "border-amber-200 bg-amber-50 text-amber-700",
        dot: "bg-amber-500",
        label: "In review",
      };
    case "DRAFT":
    default:
      return {
        wrapper: "border-slate-200 bg-slate-50 text-slate-600",
        dot: "bg-slate-400",
        label: "Draft",
      };
  }
};

const avatarStyles = [
  "bg-orange-100 text-orange-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-700",
];

// Helper to format currency (e.g., 50000 -> ₹50,000)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper to format dates
const formatDate = (date: Date | null) => {
  if (!date) return "No deadline";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export default function CampaignsCard({ campaigns }: CampaignsCardProps) {
  // Count active campaigns (anything not DRAFT)
  const activeCount = campaigns.filter((c) => c.status !== "DRAFT").length;

  return (
    <section
      id="campaigns"
      className="
        scroll-mt-24
        overflow-hidden
        rounded-3xl
        border border-slate-200/80
        bg-white
        shadow-sm
        shadow-slate-200/40
      "
    >
      {/* Header */}
      <div
        className="
          flex flex-col gap-4
          border-b border-slate-100
          px-5 py-5
          sm:flex-row sm:items-center sm:justify-between
          sm:px-6
          lg:px-7
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold tracking-tight text-slate-950">
              Active campaigns
            </h2>

            <span
              className="
                inline-flex min-w-6 items-center justify-center
                rounded-full
                bg-slate-100
                px-2 py-0.5
                text-[11px] font-bold
                text-slate-600
              "
            >
              {activeCount}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Track your ongoing creator campaigns
          </p>
        </div>

        <a
          href="/dashboard/brand/campaigns"
          className="
            group inline-flex items-center justify-center gap-1.5
            rounded-xl
            border border-slate-200
            bg-white
            px-3.5 py-2
            text-xs font-semibold
            text-slate-700
            transition-all
            hover:border-slate-300
            hover:bg-slate-50
            hover:text-slate-950
          "
        >
          View all
          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </div>

      {/* Campaign list */}
      <div className="divide-y divide-slate-100">
        {campaigns.map((campaign) => {
          const status = getStatusConfig(campaign.status);
          const campaignCreators = campaign.creators || [];

          // Temporary mock data for progress/spent since it lives in the junction table
          const spent = 0;
          const progress =
            campaign.status === "LIVE"
              ? 45
              : campaign.status === "IN_REVIEW"
                ? 90
                : 0;

          return (
            <article
              key={campaign.id}
              className="
                group
                relative
                px-5 py-5
                transition-colors
                hover:bg-slate-50/60
                sm:px-6
                lg:px-7
              "
            >
              {/* Main content */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3
                        className="
                          truncate
                          text-sm font-bold
                          tracking-tight
                          text-slate-950
                        "
                      >
                        {campaign.title}
                      </h3>

                      <span
                        className={`
                          inline-flex shrink-0 items-center gap-1.5
                          rounded-full
                          border
                          px-2 py-1
                          text-[10px] font-bold
                          ${status.wrapper}
                        `}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                        />

                        {status.label}
                      </span>
                    </div>

                    <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-500">
                      {campaign.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Open ${campaign.title}`}
                    className="
                      hidden shrink-0
                      h-9 w-9
                      place-items-center
                      rounded-xl
                      border border-slate-200
                      bg-white
                      text-slate-400
                      transition-all
                      hover:border-slate-300
                      hover:text-slate-950
                      sm:grid
                    "
                  >
                    <ArrowUpRight size={16} />
                  </button>
                </div>

                {/* Campaign information */}
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                    sm:flex sm:flex-wrap sm:items-center
                    sm:gap-x-6 sm:gap-y-3
                  "
                >
                  {/* Creators */}
                  <div className="flex items-center gap-2">
                    <Users size={14} className="shrink-0 text-slate-400" />

                    {campaignCreators.length > 0 ? (
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {campaignCreators
                            .slice(0, 3)
                            .map((creator, index) => (
                              <span
                                key={index}
                                className={`
                                grid h-7 w-7 place-items-center
                                rounded-full
                                border-2 border-white
                                text-[9px] font-bold
                                ring-1 ring-slate-100
                                ${avatarStyles[index % avatarStyles.length]}
                              `}
                              >
                                CR
                              </span>
                            ))}
                        </div>

                        {campaignCreators.length > 3 && (
                          <span className="ml-2 text-[11px] font-medium text-slate-500">
                            +{campaignCreators.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">
                        No creators yet
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <CalendarDays size={14} className="text-slate-400" />
                    {formatDate(campaign.deadline)}
                  </div>

                  {/* Budget */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <CircleDollarSign size={14} className="text-slate-400" />

                    <span>
                      <span className="font-semibold text-slate-700">
                        {formatCurrency(spent)}
                      </span>{" "}
                      / {formatCurrency(campaign.budget)}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                {progress > 0 && (
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-medium text-slate-400">
                        Campaign progress
                      </span>

                      <span className="text-[10px] font-bold text-slate-600">
                        {progress}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`
                          h-full rounded-full
                          transition-all duration-700
                          ${
                            campaign.status === "IN_REVIEW"
                              ? "bg-amber-500"
                              : "bg-orange-500"
                          }
                        `}
                        style={{
                          width: `${Math.min(Math.max(progress, 0), 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3.5 sm:px-6 lg:px-7">
        <a
          href="/dashboard/brand/campaigns/new"
          className="
            inline-flex items-center gap-2
            text-xs font-semibold
            text-orange-600
            transition-colors
            hover:text-orange-700
          "
        >
          <span
            className="
              grid h-5 w-5 place-items-center
              rounded-md
              bg-orange-100
              text-orange-600
            "
          >
            +
          </span>
          Create a new campaign
        </a>
      </div>
    </section>
  );
}
