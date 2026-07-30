import { Creator } from "@/constants/data/mockCreators";

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
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col items-center pt-8 pb-6 px-4 hover:shadow-md transition-shadow">
      {/* Top Color Banner */}
      <div className={`absolute top-0 left-0 w-full h-2 ${themeColor}`}></div>

      {/* Floating Badge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-500 text-[10px] font-bold tracking-wider px-3 py-1 rounded-b-md uppercase">
        Preview Results
      </div>

      {/* Avatar */}
      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-white shadow-sm">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Profile Info */}
      <h3 className="text-lg font-bold text-gray-900">
        {name} <span className="text-blue-500 text-sm">✔</span>
      </h3>
      <p className="text-sm text-gray-500 mb-1">{handle}</p>
      <p className="text-sm font-medium text-gray-700 mb-6">Niche - {niche}</p>

      {/* Metrics Grid */}
      <div className="w-full grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-4">
        <div>
          <p className="text-sm font-bold text-gray-900">{followers}</p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div className="border-l border-gray-100">
          <p className="text-sm font-bold text-gray-900">{followers}</p>{" "}
          {/* Re-using followers for mockup accuracy to your image */}
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div className="border-l border-gray-100">
          <p className="text-sm font-bold text-gray-900">{avgViews}</p>
          <p className="text-xs text-gray-500">Avg. Views</p>
        </div>
      </div>
    </div>
  );
}
