"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Mail,
  Search,
  ChevronDown,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { tabs } from "@/app/(creator)/dashboard/creator/data/dashboard-header";

export default function DashboardHeader() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const [profileOpen, setProfileOpen] = useState(false);

  const userName = session?.user?.name || "Creator";

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Top Header */}
        <div className="flex h-[72px] items-center justify-between gap-6">
          {/* Logo + Search */}
          <div className="flex min-w-0 items-center gap-8">
            <Link
              href="/dashboard/creator"
              className="shrink-0 text-xl font-black tracking-tight text-slate-950"
            >
              Creator<span className="text-orange-500">Link</span>
            </Link>

            {/* Search */}
            <div className="relative hidden w-[320px] lg:block xl:w-[390px]">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                placeholder="Search campaigns, brands or messages"
                className="
                  h-11 w-full rounded-xl
                  border border-slate-200
                  bg-slate-50/70
                  pl-10 pr-16
                  text-sm text-slate-900
                  outline-none
                  placeholder:text-slate-400
                  transition-all
                  focus:border-orange-300
                  focus:bg-white
                  focus:ring-4
                  focus:ring-orange-500/10
                "
              />

              <div
                className="
                  pointer-events-none absolute right-3 top-1/2
                  hidden -translate-y-1/2
                  rounded-md border border-slate-200
                  bg-white px-1.5 py-0.5
                  text-[10px] font-medium text-slate-400
                  xl:block
                "
              >
                Ctrl K
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <HeaderIcon
              label="Messages"
              href="/dashboard/creator/messages"
              icon={<Mail className="h-[18px] w-[18px]" />}
            />

            <HeaderIcon
              label="Notifications"
              href="/dashboard/creator/notifications"
              icon={<Bell className="h-[18px] w-[18px]" />}
              notification
            />

            <div className="mx-1 hidden h-8 w-px bg-slate-200 sm:block" />

            {/* Profile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                className="
                  group flex items-center gap-2.5
                  rounded-xl p-1.5
                  transition-all
                  hover:bg-slate-50
                "
              >
                {/* Avatar */}
                <div
                  className="
                    grid h-9 w-9 shrink-0 place-items-center
                    rounded-full
                    bg-slate-950
                    text-xs font-bold text-white
                    ring-2 ring-white
                    shadow-sm
                  "
                >
                  {isPending ? "..." : initials}
                </div>

                {/* User Info */}
                <div className="hidden text-left md:block">
                  <p className="max-w-[140px] truncate text-sm font-semibold leading-4 text-slate-950">
                    {isPending ? "Loading..." : userName}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Creator workspace
                  </p>
                </div>

                <ChevronDown
                  size={15}
                  className={`
                    hidden text-slate-400
                    transition-transform
                    md:block
                    ${profileOpen ? "rotate-180" : ""}
                  `}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div
                  className="
                    absolute right-0 top-[calc(100%+10px)]
                    w-56 overflow-hidden
                    rounded-2xl border border-slate-200
                    bg-white p-2
                    shadow-xl shadow-slate-200/50
                  "
                >
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="truncate text-sm font-semibold text-slate-950">
                      {userName}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {session?.user?.email}
                    </p>
                  </div>

                  <div className="mt-1">
                    <ProfileLink
                      href="/dashboard/creator/profile"
                      icon={<User className="h-4 w-4" />}
                      label="My Profile"
                      onClick={() => setProfileOpen(false)}
                    />

                    <ProfileLink
                      href="/dashboard/creator/settings"
                      icon={<Settings className="h-4 w-4" />}
                      label="Settings"
                      onClick={() => setProfileOpen(false)}
                    />

                    <button
                      type="button"
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-2.5
                        text-sm text-red-600
                        transition
                        hover:bg-red-50
                      "
                      onClick={() => {
                        // Add signOut() here later
                        setProfileOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <nav className="flex gap-7 overflow-x-auto border-t border-slate-100 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const href = tab.href;

            /*
             * Overview needs exact matching.
             *
             * Otherwise:
             * /dashboard/creator
             * would also match
             * /dashboard/creator/applications
             */
            const active =
              href === "/dashboard/creator"
                ? pathname === href
                : pathname.startsWith(href);

            return (
              <Link
                key={tab.label}
                href={href}
                className={`
                  group relative
                  flex h-12 shrink-0
                  items-center gap-2
                  text-sm font-medium
                  transition-colors
                  ${
                    active
                      ? "text-slate-950"
                      : "text-slate-500 hover:text-slate-950"
                  }
                `}
              >
                <span>{tab.label}</span>

                {tab.badge ? (
                  <span
                    className={`
                      rounded-full px-2 py-0.5
                      text-[10px] font-bold
                      transition
                      ${
                        active
                          ? "bg-slate-950 text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600"
                      }
                    `}
                  >
                    {tab.badge}
                  </span>
                ) : null}

                {/* Active / Hover underline */}
                <span
                  className={`
                    absolute inset-x-0 bottom-0
                    h-0.5 rounded-full
                    bg-orange-500
                    transition-transform duration-200
                    ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }
                  `}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

/* ───────────────────────────────────────────── */

function HeaderIcon({
  label,
  href,
  icon,
  notification = false,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
  notification?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="
        relative grid h-10 w-10
        place-items-center
        rounded-xl
        border border-slate-200
        bg-white
        text-slate-500
        transition-all
        hover:border-slate-300
        hover:bg-slate-50
        hover:text-slate-950
        hover:shadow-sm
      "
    >
      {icon}

      {notification && (
        <span
          className="
            absolute right-[7px] top-[7px]
            h-2 w-2
            rounded-full
            bg-orange-500
            ring-2 ring-white
          "
        />
      )}
    </Link>
  );
}

/* ───────────────────────────────────────────── */

function ProfileLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        flex items-center gap-3
        rounded-xl px-3 py-2.5
        text-sm text-slate-600
        transition
        hover:bg-slate-50
        hover:text-slate-950
      "
    >
      {icon}
      {label}
    </Link>
  );
}