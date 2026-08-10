"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const navLinks = [
  { label: "How it Works", href: "/how-it-works" },
  { label: "For Brands", href: "/for-brands" },
  { label: "For Creators", href: "/for-creators" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const isBrand = session?.user?.role === "BRAND";

  const dashboardUrl = isBrand ? "/dashboard/brand" : "/dashboard/creator";

  const authUrl = session ? dashboardUrl : "/login";
  const authLabel = session ? "Dashboard" : "Log in";
  
  const closeMenu = () => {
    setIsOpen(false);
  };

  const renderAuthAction = (mobile = false) => {
    if (isPending) {
      return (
        <div
          className={
            mobile
              ? "mt-3 h-12 w-full animate-pulse rounded-xl bg-gray-200"
              : "h-9 w-20 animate-pulse rounded-lg bg-gray-200"
          }
        />
      );
    }

    return (
      <Link
        href={authUrl}
        onClick={mobile ? closeMenu : undefined}
        className={
          mobile
            ? "mt-3 rounded-xl border border-gray-100 bg-white py-3 text-center text-gray-900 transition hover:bg-gray-100"
            : "rounded-lg bg-linear-to-r from-fuchsia-600 to-violet-600 px-5 py-2 text-sm font-medium text-white shadow-md transition hover:opacity-95"
        }
      >
        {authLabel}
      </Link>
    );
  };

  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-4">
      <nav className="mx-auto max-w-7xl rounded-3xl border border-gray-100 bg-white/80 shadow-[var(--card-shadow)] backdrop-blur-sm">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="text-lg font-bold text-gray-900"
          >
            YourLogo
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center justify-self-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-gray-700 transition hover:text-gray-900 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Authentication Action */}
          <div className="hidden justify-self-end md:flex">
            {renderAuthAction()}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="justify-self-end rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-gray-100 bg-white/90 backdrop-blur-sm md:hidden">
            <div className="flex flex-col gap-1 p-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Authentication Action */}
              {renderAuthAction(true)}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
