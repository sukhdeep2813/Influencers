"use client";

import React, { useState } from "react";
import { mockFaqData, FAQItem as FAQItemType } from "@/constants/data/mockFaq";

function FAQItem({ question, answer }: FAQItemType) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-6 text-left transition-all"
      >
        <span className="pr-6 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-violet-500">
          {question}
        </span>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ${
            isOpen
              ? "bg-violet-500 border-violet-500 text-white"
              : "group-hover:border-violet-500 group-hover:bg-violet-50"
          }`}
        >
          <svg
            className={`h-5 w-5 transition-transform duration-300 ${
              isOpen ? "rotate-45 text-black" : "text-gray-500"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14M5 12h14"
            />
          </svg>
        </div>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-6"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pr-12 text-gray-600 leading-8">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="relative overflow-hidden w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      {/* Background Glows */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-violet-100/6 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-100/6 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-20">
        <span className="inline-flex items-center rounded-full border border-violet-100 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-600">
          Frequently Asked Questions
        </span>

        <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-gray-900">
          Everything you need
          <span className="block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            to know
          </span>
        </h2>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Answers to the most common questions about CreatorLink, campaigns,
          contracts, payments and creator collaborations.
        </p>
      </div>

      {/* FAQ Groups */}
      <div className="relative z-10 space-y-10">
        {mockFaqData.map((group, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-violet-100 hover:shadow-md"
          >
            {/* Card Glow */}
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

            {/* Category */}
            <h3 className="relative z-10 mb-8 flex items-center gap-4 text-xl font-bold text-gray-900">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 shadow-lg" />
              {group.category}
            </h3>

            {/* Questions */}
            <div className="relative z-10">
              {group.items.map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
