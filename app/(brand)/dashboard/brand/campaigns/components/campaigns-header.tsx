import Link from "next/link";
import { CAMPAIGNS_PATH } from "../data/campaign-data";

export default function CampaignsHeader({ count }: { count: number }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm text-[#746d63]">Brand workspace</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Campaigns
        </h1>
        <p className="mt-2 text-sm text-[#746d63]">
          {count} campaigns · Manage your creator collaborations.
        </p>
      </div>
      <Link
        href={`${CAMPAIGNS_PATH}/new`}
        className="rounded-xl bg-[#e99735] px-4 py-3 text-sm font-semibold text-[#2b1d08] hover:bg-[#f0a547]"
      >
        + New campaign
      </Link>
    </header>
  );
}
