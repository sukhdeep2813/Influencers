import { benefits } from "@/constants/data/mockBenefits";

export default function WhyChooseUs() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-28 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-violet-100/6 blur-[120px]" />
      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-cyan-100/6 blur-[120px]" />

      {/* Header */}
      <div className="max-w-3xl mb-20">
        <span className="inline-flex items-center rounded-full border border-violet-100 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-600">
          Why CreatorLink
        </span>

        <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
          Why brands choose us
          <span className="block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            over agencies & DMs
          </span>
        </h2>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Replace spreadsheets, endless email threads, and manual payments with
          one intelligent platform built for modern creator marketing.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-violet-100 hover:shadow-md"
          >
            {/* Glow */}
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-50/6 blur-3xl transition-all duration-500 group-hover:bg-violet-100/6" />

            {/* Big Number */}
            <div className="absolute right-6 top-4 text-8xl font-black text-gray-100 transition-all duration-500 group-hover:scale-110 group-hover:text-violet-50">
              {benefit.id}
            </div>

            {/* Number Badge */}
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-lg font-bold text-white shadow transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
              {benefit.id}
            </div>

            {/* Content */}
            <div className="relative z-10 mt-8">
              <h3 className="text-2xl font-bold text-gray-900">{benefit.title}</h3>

              <p className="mt-4 leading-7 text-gray-600">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
