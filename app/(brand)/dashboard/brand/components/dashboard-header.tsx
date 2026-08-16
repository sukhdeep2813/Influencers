"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Mail, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard/brand",
  },
  {
    label: "Campaigns",
    href: "/dashboard/brand/campaigns",
  },
  {
    label: "Find Creators",
    href: "/dashboard/brand/search",
  },
  {
    label: "Applications",
    href: "/dashboard/brand/applications",
    badge: 4,
  },
  {
    label: "Messages",
    href: "/dashboard/brand/messages",
    badge: 3,
  },
  {
    label: "Saved Creators",
    href: "/dashboard/brand/saved",
  },
  {
    label: "Payments",
    href: "/dashboard/brand/payments",
  },
];

export default function DashboardHeader() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userName = session?.user?.name || "Brand";

  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* ================= TOP BAR ================= */}
        <div className="flex min-h-[68px] items-center justify-between gap-3">
          {/* Logo + Search */}
          <div className="flex min-w-0 flex-1 items-center gap-5 lg:gap-8">
            <Link
              href="/dashboard/brand"
              className="shrink-0 text-xl font-black tracking-tight text-slate-950"
            >
              Brand<span className="text-orange-500">Link</span>
            </Link>

            {/* Desktop Search */}
            <div className="relative hidden min-w-0 max-w-[390px] flex-1 lg:block">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                placeholder="Search creators, campaigns or messages"
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
                ⌘ K
              </div>
            </div>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex shrink-0 items-center gap-2">
            <HeaderIcon
              label="Messages"
              href="/dashboard/brand/messages"
              icon={<Mail className="h-[18px] w-[18px]" />}
              notification
            />

            <HeaderIcon
              label="Notifications"
              href="/dashboard/brand/notifications"
              icon={<Bell className="h-[18px] w-[18px]" />}
              notification
            />

            {/* Profile */}
            <button
              type="button"
              className="
                group flex items-center gap-2
                rounded-xl p-1.5
                transition-colors
                hover:bg-slate-50
              "
            >
              <div
                className="
                  grid h-9 w-9 shrink-0 place-items-center
                  rounded-full bg-slate-950
                  text-xs font-bold text-white
                  shadow-sm
                "
              >
                {isPending ? "..." : initials}
              </div>

              <div className="hidden text-left md:block">
                <p className="max-w-[140px] truncate text-sm font-semibold text-slate-950">
                  {isPending ? "Loading..." : userName}
                </p>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Brand workspace
                </p>
              </div>

              <ChevronDown
                size={15}
                className="hidden text-slate-400 md:block"
              />
            </button>

            {/* Mobile menu */}
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="
                grid h-10 w-10 place-items-center
                rounded-xl border border-slate-200
                bg-white text-slate-600
                transition
                hover:bg-slate-50
                lg:hidden
              "
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden border-t border-slate-100 lg:flex lg:gap-7">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* ================= MOBILE NAV ================= */}
        {mobileMenuOpen && (
          <nav className="border-t border-slate-100 py-3 lg:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const active =
                  item.href === "/dashboard/brand"
                    ? pathname === "/dashboard/brand"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center justify-between
                      rounded-xl px-3 py-3
                      text-sm font-medium
                      transition
                      ${
                        active
                          ? "bg-orange-50 text-orange-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                      }
                    `}
                  >
                    <span>{item.label}</span>

                    {item.badge && (
                      <span
                        className={`
                          rounded-full px-2 py-0.5
                          text-[10px] font-bold
                          ${
                            active
                              ? "bg-orange-500 text-white"
                              : "bg-slate-100 text-slate-600"
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

/* ================= NAV ITEM ================= */

function NavItem({
  item,
  pathname,
}: {
  item: (typeof navItems)[number];
  pathname: string;
}) {
  const active =
    item.href === "/dashboard/brand"
      ? pathname === "/dashboard/brand"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      className={`
        group relative flex h-12 shrink-0
        items-center gap-2
        text-sm font-medium
        transition-colors
        ${active ? "text-slate-950" : "text-slate-500 hover:text-slate-950"}
      `}
    >
      <span>{item.label}</span>

      {item.badge && (
        <span
          className={`
            rounded-full px-2 py-0.5
            text-[10px] font-bold
            ${
              active ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600"
            }
          `}
        >
          {item.badge}
        </span>
      )}

      <span
        className={`
          absolute inset-x-0 bottom-0 h-0.5
          rounded-full bg-orange-500
          transition-transform duration-200
          ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
    </Link>
  );
}

/* ================= HEADER ICON ================= */

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
        shrink-0 place-items-center
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
            h-2 w-2 rounded-full
            bg-orange-500
            ring-2 ring-white
          "
        />
      )}
    </Link>
  );
}
