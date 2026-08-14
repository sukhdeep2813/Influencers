import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";
import { SectionHeader } from "./section-header";

const days = [
  {
    day: 5,
    weekday: "Wed",
    status: "free",
    slots: "3 slots",
  },
  {
    day: 6,
    weekday: "Thu",
    status: "free",
    slots: "2 slots",
  },
  {
    day: 7,
    weekday: "Fri",
    status: "busy",
    slots: "Busy",
  },
  {
    day: 8,
    weekday: "Sat",
    status: "free",
    slots: "4 slots",
  },
  {
    day: 9,
    weekday: "Sun",
    status: "booked",
    slots: "Booked",
  },
  {
    day: 10,
    weekday: "Mon",
    status: "booked",
    slots: "Booked",
  },
  {
    day: 11,
    weekday: "Tue",
    status: "free",
    slots: "2 slots",
  },
] as const;

export default function AvailabilityCard() {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 sm:p-6">
      {/* Premium background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-100/60 blur-3xl transition-all duration-500 group-hover:bg-orange-200/70" />

      <div className="relative">
        {/* Header */}
        <SectionHeader title="Availability" action="Edit" />

        {/* Month selector */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
              <CalendarDays className="h-[18px] w-[18px] text-orange-500" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-950">August 2026</p>
              <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                Your next 7 days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous week"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-900 hover:shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Next week"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-900 hover:shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
          {days.map((item) => {
            const isBooked = item.status === "booked";
            const isBusy = item.status === "busy";

            return (
              <button
                key={item.day}
                type="button"
                className={`group/day relative flex min-h-[76px] flex-col items-center justify-center rounded-2xl border p-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  isBooked
                    ? "border-orange-100 bg-orange-50/70 text-orange-700 hover:border-orange-200 hover:bg-orange-50"
                    : isBusy
                      ? "border-rose-100 bg-rose-50/70 text-rose-700 hover:border-rose-200"
                      : "border-slate-100 bg-slate-50/60 text-slate-700 hover:border-slate-200 hover:bg-white"
                }`}
              >
                {/* Weekday */}
                <span className="text-[10px] font-semibold uppercase tracking-wide opacity-60">
                  {item.weekday}
                </span>

                {/* Day */}
                <span className="mt-1 text-lg font-bold tracking-tight">
                  {item.day}
                </span>

                {/* Status indicator */}
                <span
                  className={`mt-1.5 flex items-center gap-1 text-[9px] font-bold ${
                    isBooked
                      ? "text-orange-600"
                      : isBusy
                        ? "text-rose-600"
                        : "text-emerald-600"
                  }`}
                >
                  {isBooked ? (
                    <Check className="h-2.5 w-2.5" />
                  ) : isBusy ? (
                    <Clock3 className="h-2.5 w-2.5" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}

                  <span className="hidden sm:inline">{item.slots}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Availability summary */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50/80 to-white p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-200">
              <Clock3 className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                Available this week
              </p>
              <p className="mt-0.5 text-sm font-bold text-slate-950">
                11 collaboration slots
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="View availability"
            className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-100 transition hover:text-orange-500 hover:shadow-md"
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-4">
          <Legend color="bg-emerald-500" label="Available" />
          <Legend color="bg-orange-500" label="Booked" />
          <Legend color="bg-rose-400" label="Busy" />
        </div>
      </div>
    </article>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}
