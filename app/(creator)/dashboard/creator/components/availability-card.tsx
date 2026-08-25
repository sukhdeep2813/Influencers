"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";

import { SectionHeader } from "./section-header";
import {
  CreatorAvailability,
  AvailabilityStatus,
} from "../../../../../generated/prisma";

interface AvailabilityCardProps {
  availability: CreatorAvailability[];
}

export default function AvailabilityCard({
  availability = [],
}: AvailabilityCardProps) {
  /*
   * We keep the selected week as an offset from the current week.
   *
   * 0  = current week
   * -1 = previous week
   * +1 = next week
   */
  const [weekOffset, setWeekOffset] = useState(0);

  /*
   * Starting  from today's date but normalize the time.
   * This avoids timezone/time-of-day comparison problems.
   */
  const today = useMemo(() => {
    const date = new Date();

    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }, []);

  /*
   * Get the start of the selected week.
   *
   * We use Monday as the first day of the week.
   */
  const startOfWeek = useMemo(() => {
    const date = new Date(today);

    const day = date.getDay();

    // Sunday = 0, Monday = 1
    const daysFromMonday = day === 0 ? 6 : day - 1;

    date.setDate(date.getDate() - daysFromMonday);
    date.setDate(date.getDate() + weekOffset * 7);

    return date;
  }, [today, weekOffset]);

  /*
   * Generate the 7 days of the selected week.
   */
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);

      return date;
    });
  }, [startOfWeek]);

  /*
   * Month/year shown in the header.
   *
   * If the selected week crosses two months, we show the
   * month of the first day, which keeps the UI clean.
   */
  const currentMonthYear = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(startOfWeek);
  }, [startOfWeek]);

  /*
   * Normalizing  date to YYYY-MM-DD.
   *
   */
  const getDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /*
   * Building  a quick lookup map from the Prisma data.
   *
   * Instead of calling availability.find() for every day,
   * we create the map once.
   */
  const availabilityMap = useMemo(() => {
    const map = new Map<string, CreatorAvailability>();

    availability.forEach((item) => {
      const date = new Date(item.date);

      map.set(getDateKey(date), item);
    });

    return map;
  }, [availability]);

  /*
   * Get availability for a particular date.
   *
   * If no database record exists, we consider the day available
   * with zero slots.
   */
  const getDayData = (date: Date) => {
    const record = availabilityMap.get(getDateKey(date));

    if (record) {
      return record;
    }

    return {
      status: AvailabilityStatus.AVAILABLE,
      slots: 0,
    };
  };

  /*
   * Calculate total available slots for the selected week.
   */
  const totalSlotsThisWeek = useMemo(() => {
    return weekDays.reduce((total, date) => {
      const data = getDayData(date);

      if (data.status === AvailabilityStatus.AVAILABLE) {
        return total + (data.slots ?? 0);
      }

      return total;
    }, 0);
  }, [weekDays, availabilityMap]);

  /*
   * Go to previous week.
   */
  const handlePreviousWeek = () => {
    setWeekOffset((current) => current - 1);
  };

  /*
   * Go to next week.
   */
  const handleNextWeek = () => {
    setWeekOffset((current) => current + 1);
  };

  /*
   * Return to the current week.
   */
  const handleToday = () => {
    setWeekOffset(0);
  };

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
              <p className="text-sm font-bold text-slate-950">
                {currentMonthYear}
              </p>

              <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                {weekOffset === 0
                  ? "Your current week"
                  : weekOffset < 0
                    ? `${Math.abs(weekOffset)} week${
                        Math.abs(weekOffset) > 1 ? "s" : ""
                      } ago`
                    : `${weekOffset} week${weekOffset > 1 ? "s" : ""} ahead`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Previous week */}
            <button
              type="button"
              onClick={handlePreviousWeek}
              aria-label="Previous week"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-900 hover:shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Today */}
            {weekOffset !== 0 && (
              <button
                type="button"
                onClick={handleToday}
                className="hidden rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-orange-500 transition hover:bg-white sm:block"
              >
                Today
              </button>
            )}

            {/* Next week */}
            <button
              type="button"
              onClick={handleNextWeek}
              aria-label="Next week"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-900 hover:shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
          {weekDays.map((date) => {
            const data = getDayData(date);

            const isBooked = data.status === AvailabilityStatus.BOOKED;

            const isBusy = data.status === AvailabilityStatus.BUSY;

            const isFree = data.status === AvailabilityStatus.AVAILABLE;

            const dayNumber = date.getDate();

            const weekday = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            }).format(date);

            const slots = data.slots ?? 0;

            const slotsText = isBooked
              ? "Booked"
              : isBusy
                ? "Busy"
                : `${slots} slots`;

            const isToday = getDateKey(date) === getDateKey(today);

            return (
              <button
                key={getDateKey(date)}
                type="button"
                className={`
                  group/day relative flex min-h-[76px]
                  flex-col items-center justify-center
                  rounded-2xl border p-2
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-md

                  ${
                    isBooked
                      ? "border-orange-100 bg-orange-50/70 text-orange-700 hover:border-orange-200 hover:bg-orange-50"
                      : isBusy
                        ? "border-rose-100 bg-rose-50/70 text-rose-700 hover:border-rose-200"
                        : "border-slate-100 bg-slate-50/60 text-slate-700 hover:border-slate-200 hover:bg-white"
                  }

                  ${isToday ? "ring-2 ring-orange-400/30 ring-offset-1" : ""}
                `}
              >
                {/* Today indicator */}
                {isToday && (
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-orange-500" />
                )}

                {/* Weekday */}
                <span className="text-[10px] font-semibold uppercase tracking-wide opacity-60">
                  {weekday}
                </span>

                {/* Day */}
                <span className="mt-1 text-lg font-bold tracking-tight">
                  {dayNumber}
                </span>

                {/* Status */}
                <span
                  className={`
                    mt-1.5 flex items-center gap-1
                    text-[9px] font-bold

                    ${
                      isBooked
                        ? "text-orange-600"
                        : isBusy
                          ? "text-rose-600"
                          : "text-emerald-600"
                    }
                  `}
                >
                  {isBooked ? (
                    <Check className="h-2.5 w-2.5" />
                  ) : isBusy ? (
                    <Clock3 className="h-2.5 w-2.5" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}

                  <span className="hidden sm:inline">{slotsText}</span>
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
                {totalSlotsThisWeek} collaboration{" "}
                {totalSlotsThisWeek === 1 ? "slot" : "slots"}
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/creator/availability"
            aria-label="View availability"
            className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-100 transition hover:text-orange-500 hover:shadow-md"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
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
