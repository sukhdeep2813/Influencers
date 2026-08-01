import { platformFeatures } from "@/constants/data/mockFeatureGrid";

export default function BentoGrid() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-28">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="inline-flex items-center rounded-full border border-violet-100 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-600">
          Platform Features
        </span>

        <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Everything you need,
          <br />
          <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            in one place
          </span>
        </h2>

        <p className="mt-6 text-lg text-gray-400 leading-relaxed">
          One dashboard for search, outreach, contracts, campaign management and
          payments—built for brands and creators.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[230px] gap-6">
        {platformFeatures.map((feature, idx) => (
          <div
            key={feature.id}
            className={`
              group
              relative
              overflow-hidden
              rounded-3xl
              p-8

              border border-gray-100
              bg-white
              backdrop-blur-sm

              shadow-sm

              transition-all
              duration-500

              hover:-translate-y-2
              hover:scale-[1.02]
              hover:border-violet-200
              hover:shadow-md

              animate-fade-up
              ${feature.className}
            `}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {/* Background Glow */}
            <div className="absolute -top-28 -right-28 h-72 w-72 rounded-full bg-violet-50 blur-3xl transition-all duration-500 group-hover:bg-violet-100" />

            {/* Light Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-70" />

            {/* Top Right Gradient */}
            <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-2xl" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between">
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md shadow-md text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                {feature.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
