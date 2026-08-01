import Image from "next/image";
import Link from "next/link";
import { FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

const footerLinks = {
  Product: [
    { label: "How it works", href: "/how-it-works" },
    { label: "For brands", href: "/for-brands" },
    { label: "For creators", href: "/for-creators" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
    { label: "Cookie policy", href: "/cookies" },
  ],
};

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-200 border-t border-slate-800 px-6 py-16 mt-auto relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/90 to-transparent" />
      <div className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 relative">
        {/* Brand section - spans 2 columns on desktop for better proportions */}
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-3 w-fit">
            <Image
              src="/logo.png"
              alt="Brandly logo"
              width={28}
              height={28}
              style={{ objectFit: "contain" }}
            />
            <span className="font-semibold text-base tracking-tight text-white">
              Brandly
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Connecting brands and creators, instantly.
          </p>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_35px_80px_rgba(15,23,42,0.22)] backdrop-blur-xl">
            <p className="text-sm text-slate-300 max-w-sm">
              Ready to scale creator campaigns with a premium brand experience?
            </p>
            <Link
              href="/signup"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition duration-300 hover:brightness-110"
            >
              Start free trial
            </Link>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section} className="col-span-1">
            <p className="text-slate-200 text-sm font-semibold mb-4">
              {section}
            </p>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="w-full max-w-6xl mx-auto mt-12 pt-6 border-t border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 relative">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Brandly. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link href="#" aria-label="X (Twitter)">
            <FaXTwitter
              size={18}
              className="text-slate-500 hover:text-white transition-colors"
            />
          </Link>
          <Link href="#" aria-label="Instagram">
            <FaInstagram
              size={18}
              className="text-slate-500 hover:text-white transition-colors"
            />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <FaLinkedin
              size={18}
              className="text-slate-500 hover:text-white transition-colors"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
