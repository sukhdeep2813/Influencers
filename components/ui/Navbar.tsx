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
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
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
                  className="relative text-sm font-medium text-gray-300 transition-all duration-300 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
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
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg"
            >
              Log in
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="justify-self-end md:hidden rounded-lg p-2 transition hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="border-t border-white/10 bg-black/30 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1 p-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-xl border border-white/20 bg-white/10 py-3 text-center text-white transition hover:bg-white hover:text-black"
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
