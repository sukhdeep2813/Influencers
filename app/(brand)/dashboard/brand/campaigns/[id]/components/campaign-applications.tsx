"use client";

import { useState } from "react";
import { Prisma } from "../../../../../../../generated/prisma";
import { compact, control, panel } from "../../components/campaign-utils";

// Define the shape of the junction table including the nested user data
type ApplicationWithData = Prisma.CampaignCreatorGetPayload<{
  include: {
    creator: {
      include: { user: true };
    };
  };
}>;

export default function CampaignApplications({
  applications,
}: {
  applications: ApplicationWithData[];
}) {
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = applications.filter(
    (item) => statusFilter === "ALL" || item.status === statusFilter,
  );

  return (
    <section id="applications" className={panel}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">
          Applications ({applications.length})
        </h2>
        <select
          aria-label="Application status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={control}
        >
          <option value="ALL">All applications</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <p className="mt-3 text-sm text-[#746d63]" aria-live="polite">
        {filtered.length} applications shown
      </p>

      {!filtered.length ? (
        <p className="py-8 text-center text-sm text-[#746d63]">
          No applications in this category.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-[#eee7dc]">
          {filtered.map((applicant) => {
            const name = applicant.creator.user.name || "Unknown Creator";

            // Temporary fallbacks using type assertion in case these aren't in your DB yet
            const creatorData =
              applicant.creator as typeof applicant.creator & {
                primaryPlatform?: string;
                followers?: number;
              };

            const platform = creatorData.primaryPlatform || "Social Media";
            const followers = creatorData.followers || 0;
            return (
              <li
                key={applicant.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="mt-1 text-sm text-[#746d63]">
                    {platform} · {followers > 0 ? compact(followers) : "—"}{" "}
                    followers
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    applicant.status === "ACCEPTED"
                      ? "bg-[#dcf3ed] text-[#17685d]"
                      : applicant.status === "REJECTED"
                        ? "bg-[#f9e7e2] text-[#91402f]"
                        : "bg-[#fff0d8] text-[#91530d]"
                  }`}
                >
                  {applicant.status}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
