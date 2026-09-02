import { ArrowUpRight, CalendarDays, Plus } from "lucide-react";
import { SectionHeader } from "@/app/(creator)/dashboard/creator/components/section-header";
import { ApplicationStatus, Prisma } from "../../../../../generated/prisma";

// 1. Let Prisma generate the exact type based on our page.tsx query
type CreatorCampaign = Prisma.CampaignCreatorGetPayload<{
  include: {
    campaign: {
      include: {
        brand: true;
      };
    };
  };
}>;

type CampaignsCardProps = {
  campaigns: CreatorCampaign[];
};

// 2. Map your database ApplicationStatus to UI styles
const getStatusConfig = (status: ApplicationStatus) => {
  switch (status) {
    case "ACCEPTED":
      return {
        dot: "bg-emerald-500",
        badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        label: "Accepted",
      };
    case "PENDING":
      return {
        dot: "bg-blue-500",
        badge: "bg-blue-50 text-blue-700 ring-blue-100",
        label: "Pending",
      };
    case "REJECTED":
    case "WITHDRAWN":
    default:
      return {
        dot: "bg-slate-400",
        badge: "bg-slate-50 text-slate-700 ring-slate-200",
        label: status.charAt(0) + status.slice(1).toLowerCase(),
      };
  }
};

// Helper to format dates dynamically
const formatDate = (date: Date | null) => {
  if (!date) return "No deadline";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

export default function CampaignsCard({ campaigns }: CampaignsCardProps) {
  return (
    <article className="group rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg sm:p-6">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-50 text-orange-600">
              <CalendarDays className="h-[18px] w-[18px]" />
            </div>

            <div>
              <h2 className="text-base font-bold tracking-tight text-slate-950">
                Upcoming campaigns
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Your upcoming brand work
              </p>
            </div>
          </div>
        </div>

        <SectionHeader title="" action="Calendar" />
      </div>

      {/* Campaign list */}
      <div className="space-y-2">
        {campaigns.length === 0 ? (
          <div className="py-6 text-center text-sm text-slate-500">
            No active campaigns yet.
          </div>
        ) : (
          campaigns.map((junctionRecord) => {
            const { campaign } = junctionRecord;
            const brandName = campaign.brand?.companyName || "Brand";
            const initials = brandName.slice(0, 2).toUpperCase();
            const style = getStatusConfig(junctionRecord.status);

            return (
              <div
                key={junctionRecord.id}
                className="
                group/item flex items-center justify-between gap-3
                rounded-2xl border border-transparent
                p-3
                transition-all duration-200
                hover:border-slate-200
                hover:bg-slate-50/80
              "
              >
                {/* Brand */}
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                    grid h-11 w-11 shrink-0 place-items-center
                    rounded-xl
                    bg-slate-950
                    text-[11px] font-bold text-white
                    shadow-sm
                    transition-transform duration-200
                    group-hover/item:scale-105
                  "
                  >
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-slate-950">
                        {brandName}
                      </p>

                      <ArrowUpRight
                        className="
                        h-3.5 w-3.5 shrink-0
                        text-slate-300
                        opacity-0
                        transition-all
                        group-hover/item:translate-x-0.5
                        group-hover/item:text-slate-500
                        group-hover/item:opacity-100
                      "
                      />
                    </div>

                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {campaign.title}
                    </p>
                  </div>
                </div>

                {/* Due + Status */}
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <p className="text-xs font-medium text-slate-500">
                    Due {formatDate(campaign.deadline)}
                  </p>

                  <span
                    className={`
                    inline-flex items-center gap-1.5
                    rounded-full px-2.5 py-1
                    text-[10px] font-bold
                    ring-1 ring-inset
                    ${style.badge}
                  `}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {style.label}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <button
          type="button"
          className="
            group/button inline-flex w-full items-center justify-center gap-2
            rounded-2xl border border-dashed border-slate-300
            bg-slate-50/50
            py-3
            text-sm font-semibold text-slate-600
            transition-all duration-200
            hover:border-orange-300
            hover:bg-orange-50/50
            hover:text-orange-700
          "
        >
          <span
            className="
              grid h-6 w-6 place-items-center
              rounded-lg bg-white
              shadow-sm
              transition-transform duration-200
              group-hover/button:rotate-90
            "
          >
            <Plus className="h-3.5 w-3.5" />
          </span>
          Add availability
        </button>
      </div>
    </article>
  );
}
