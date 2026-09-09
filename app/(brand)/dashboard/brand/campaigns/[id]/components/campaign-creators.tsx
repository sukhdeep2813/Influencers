import { panel, type Creator } from "../../data/campaign-data";

export default function CampaignCreators({ creators }: { creators: Creator[] }) {
  return (
    <section className={panel}>
      <h2 className="text-lg font-semibold">Creators <span className="text-[#746d63]">({creators.length})</span></h2>
      {!creators.length ? <p className="mt-4 text-sm text-[#746d63]">No creators assigned yet.</p> : <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {creators.map((creator) => <li key={creator.name} className="flex min-w-0 items-center gap-3 rounded-xl bg-[#f7f3eb] p-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f2dfbd] text-xs font-bold text-[#71501e]">{creator.initials}</span><div className="min-w-0"><p className="truncate text-sm font-semibold">{creator.name}</p><p className="mt-1 text-xs text-[#746d63]">{creator.status}</p></div></li>)}
      </ul>}
    </section>
  );
}