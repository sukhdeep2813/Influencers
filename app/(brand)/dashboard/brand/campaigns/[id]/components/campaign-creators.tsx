import { Prisma } from "../../../../../../../generated/prisma";
import { panel } from "../../components/campaign-utils";

// Define the shape of the junction table including the nested user data
type CampaignCreatorWithData = Prisma.CampaignCreatorGetPayload<{
  include: {
    creator: {
      include: { user: true };
    };
  };
}>;

export default function CampaignCreators({
  creators,
}: {
  creators: CampaignCreatorWithData[];
}) {
  return (
    <section className={panel}>
      <h2 className="text-lg font-semibold">
        Creators <span className="text-[#746d63]">({creators.length})</span>
      </h2>

      {!creators.length ? (
        <p className="mt-4 text-sm text-[#746d63]">No creators assigned yet.</p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {creators.map((junction) => {
            // Safely extract the creator's real name or fallback
            const name = junction.creator.user.name || "Unknown Creator";

            // Dynamically generate initials (e.g., "Sukhdeep Kumar" -> "SU")
            const initials =
              name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "NA";

            return (
              <li
                key={junction.id}
                className="flex min-w-0 items-center gap-3 rounded-xl bg-[#f7f3eb] p-3"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f2dfbd] text-xs font-bold text-[#71501e]">
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{name}</p>
                  <p className="mt-1 text-[11px] font-medium text-[#746d63]">
                    {junction.status}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
