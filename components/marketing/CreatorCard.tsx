import { Creator } from "@/constants/data/mockCreators";
import Image from "next/image";

interface CreatorCardProps extends Creator {
  imageUrl?: string;
}

export default function CreatorCard({
  name,
  handle,
  niche,
  followers,
  avgViews,
  themeColor,
  imageUrl = "https://ui-avatars.com/api/?name=" +
    name.replace(" ", "+") +
    "&background=random",
}: CreatorCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl shadow-[var(--card-shadow)] border border-gray-100 overflow-hidden flex flex-col items-center pt-8 pb-6 px-4 transform transition-all duration-350 hover:shadow-2xl hover:-translate-y-1.5 hover:scale-[1.01] animate-fade-up">
      {/* Top Color Banner */}
      <div className={`absolute top-0 left-0 w-full h-2 ${themeColor}`}></div>

      {/* Floating Badge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-sm border border-gray-100 text-gray-600 text-[10px] font-semibold tracking-wider px-3 py-1 rounded-b-md uppercase shadow-sm">
        Preview Results
      </div>

      {/* Avatar with gradient ring */}
      <div className="mb-4 rounded-full p-[2px] bg-gradient-to-tr from-fuchsia-400 via-violet-400 to-cyan-400">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-sm">
          <Image src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Profile Info */}
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        {name} <span className="text-white bg-emerald-500 rounded-full px-2 py-0.5 text-xs font-bold">✔</span>
      </h3>
      <p className="text-sm text-gray-500 mb-1">{handle}</p>
      <p className="text-sm font-medium text-gray-700 mb-6">Niche - {niche}</p>

      {/* Metrics Grid */}
      <div className="w-full grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-4">
        <div>
          <p className="text-base font-semibold text-gray-900">{followers}</p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div className="border-l border-gray-100">
          <p className="text-base font-semibold text-gray-900">{followers}</p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div className="border-l border-gray-100">
          <p className="text-base font-semibold text-gray-900">{avgViews}</p>
          <p className="text-xs text-gray-500">Avg. Views</p>
        </div>
      </div>
    </div>
  );
}
