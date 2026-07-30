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

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="text-white bg-black backdrop-blur-sm sticky top-0 z-50">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-3">
        {/* Logo — left */}
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="h-auto"
            priority
          />
        </Link>

        {/* Links — centered */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium justify-self-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login — right */}
        <div className="hidden md:flex justify-self-end">
          <Link
            href="/login"
            className="border border-gray-600 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-white/10 transition-colors"
          >
            Log in
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden justify-self-end"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="border border-gray-600 text-white text-sm font-medium px-4 py-2 rounded-md text-center"
            onClick={() => setOpen(false)}
          >
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
