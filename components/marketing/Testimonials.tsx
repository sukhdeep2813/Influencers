import React from "react";

// 1. Extend the baseline type definition
import { Testimonial } from "@/constants/data/mockTestimonials";
import Image from "next/image";

interface TestimonialCardProps extends Testimonial {
  className?: string; // Allows injecting custom container utilities if needed
}

// 2. Destructure properties directly in the function arguments
export default function TestimonialCard({
  name,
  handle,
  role,
  content,
  type,
  avatar,
}: TestimonialCardProps) {
  // Choose theme colors dynamically based on the entity type
  const isBrand = type === "BRAND";
  const themeColor = isBrand ? "bg-blue-500" : "bg-indigo-500";
  const badgeStyle = isBrand
    ? "bg-blue-50 text-blue-600"
    : "bg-indigo-50 text-indigo-600";
  const checkColor = isBrand ? "text-blue-500" : "text-indigo-500";

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col items-center pt-8 pb-6 px-6 hover:shadow-md transition-shadow h-full animate-fade-up">
      {/* Top Color Banner */}
      <div className={`absolute top-0 left-0 w-full h-2 ${themeColor}`}></div>

      {/* Floating Badge */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider px-3 py-1 rounded-b-md uppercase shadow-sm ${badgeStyle}`}
      >
        {type}
      </div>

      {/* Avatar Frame */}
      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-white shadow-sm ring-1 ring-gray-50">
        <Image
          src={avatar}
          alt={name}
          width={80}
          height={80}
          unoptimized
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1">
        {name} <span className={checkColor}>✔</span>
      </h3>
      <p className="text-sm text-gray-400 mb-1">{handle}</p>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-5">
        {role}
      </p>

      {/* Central Content Box */}
      <div className="w-full border-t border-gray-100 pt-4 flex-1 flex items-center justify-center">
        <p className="text-gray-600 text-sm italic leading-relaxed text-center">
          {content}
        </p>
      </div>
    </div>
  );
}
