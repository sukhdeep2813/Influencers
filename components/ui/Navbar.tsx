"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How it Works", href: "/how-it-works" },
  { label: "For Brands", href: "/for-brands" },
  { label: "For Creators", href: "/for-creators" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <nav className="mx-auto max-w-7xl rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-[var(--card-shadow)]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <Image src="/logo.svg" alt="Logo" width={36} height={36} priority />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 justify-self-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-gray-700 transition-all duration-300 hover:text-gray-900 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-violet-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Login */}
          <div className="hidden md:flex justify-self-end">
            <Link
              href="/login"
              className="rounded-lg px-5 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-fuchsia-600 to-violet-600 shadow-md hover:opacity-95"
            >
              Log in
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
                      className="justify-self-end md:hidden rounded-lg p-2 transition hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
                  <div className="border-t border-gray-100 bg-white/90 backdrop-blur-sm md:hidden">
            <div className="flex flex-col gap-1 p-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-xl border border-gray-100 bg-white py-3 text-center text-gray-900 transition hover:opacity-95"
              >
                Log in
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
