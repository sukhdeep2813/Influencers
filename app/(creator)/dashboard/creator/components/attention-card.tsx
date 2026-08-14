import { attentionItems } from "@/app/(creator)/dashboard/creator/data/dashboard-data";
import { SectionHeader } from "@/app/(creator)/dashboard/creator/components/section-header";

const iconStyles = [
  {
    wrapper: "bg-orange-50 text-orange-600",
    dot: "bg-orange-500",
  },
  {
    wrapper: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
  },
  {
    wrapper: "bg-emerald-50 text-emerald-600",
    dot: "bg-emerald-500",
  },
];

export default function AttentionCard() {
  return (
    <article
      className="
        group rounded-3xl
        border border-slate-200/80
        bg-white
        p-5
        shadow-[0_1px_2px_rgba(15,23,42,0.03)]
        transition-all duration-300
        hover:border-slate-300
        hover:shadow-[0_12px_35px_rgba(15,23,42,0.07)]
        sm:p-6
      "
    >
      <SectionHeader title="Needs your attention" action="View all" />

      <div className="mt-5 space-y-2">
        {attentionItems.map((item, index) => {
          const Icon = item.icon;
          const style = iconStyles[index % iconStyles.length];

          return (
            <div
              key={item.title}
              className="
                group/item relative
                flex flex-col gap-4
                rounded-2xl
                border border-transparent
                p-3
                transition-all duration-200
                hover:border-slate-100
                hover:bg-slate-50/70
                sm:flex-row sm:items-center
                sm:p-3.5
              "
            >
              {/* Accent line */}
              <span
                className={`
                  absolute left-0 top-3 bottom-3
                  w-0.5 rounded-full
                  ${style.dot}
                  opacity-0
                  transition-opacity duration-200
                  group-hover/item:opacity-100
                `}
              />

              {/* Icon */}
              <div
                className={`
                  grid h-11 w-11
                  shrink-0 place-items-center
                  rounded-xl
                  ${style.wrapper}
                  transition-transform duration-200
                  group-hover/item:scale-105
                `}
              >
                <Icon className="h-[18px] w-[18px]" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3
                    className="
                      truncate
                      text-sm font-semibold
                      text-slate-950
                      transition-colors
                      group-hover/item:text-slate-900
                    "
                  >
                    {item.title}
                  </h3>

                  {/* Small status indicator */}
                  <span
                    className={`
                      hidden h-1.5 w-1.5
                      shrink-0 rounded-full
                      ${style.dot}
                      sm:block
                    `}
                  />
                </div>

                <p
                  className="
                    mt-1
                    line-clamp-2
                    text-sm
                    leading-5
                    text-slate-500
                  "
                >
                  {item.description}
                </p>
              </div>

              {/* Action */}
              <button
                type="button"
                className="
                  inline-flex h-9
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-slate-200
                  bg-white
                  px-3.5
                  text-xs font-semibold
                  text-slate-700
                  shadow-sm
                  transition-all duration-200
                  hover:border-slate-300
                  hover:bg-slate-950
                  hover:text-white
                  hover:shadow-md
                  active:scale-[0.98]
                  sm:px-4
                "
              >
                {item.action}
              </button>
            </div>
          );
        })}
      </div>
    </article>
  );
}
