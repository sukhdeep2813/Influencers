"use client";

import { useState } from "react";
import { compact, control, panel, type Application } from "../../data/campaign-data";

export default function CampaignApplications({ applications }: { applications: Application[] }) {
  const [status, setStatus] = useState("ALL");
  const filtered = applications.filter((item) => status === "ALL" || item.status === status);
  return (
    <section id="applications" className={panel}>
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-semibold">Applications ({applications.length})</h2><select aria-label="Application status" value={status} onChange={(e) => setStatus(e.target.value)} className={control}><option value="ALL">All applications</option><option value="PENDING">Pending</option><option value="ACCEPTED">Accepted</option><option value="REJECTED">Rejected</option></select></div>
      <p className="mt-3 text-sm text-[#746d63]" aria-live="polite">{filtered.length} applications shown</p>
      {!filtered.length ? <p className="py-8 text-center text-sm text-[#746d63]">No applications in this category.</p> : <ul className="mt-4 divide-y divide-[#eee7dc]">{filtered.map((applicant) => <li key={applicant.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><div><p className="font-medium">{applicant.name}</p><p className="mt-1 text-sm text-[#746d63]">{applicant.platform} · {compact(applicant.followers)} followers</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${applicant.status === "ACCEPTED" ? "bg-[#dcf3ed] text-[#17685d]" : applicant.status === "REJECTED" ? "bg-[#f9e7e2] text-[#91402f]" : "bg-[#fff0d8] text-[#91530d]"}`}>{applicant.status}</span></li>)}</ul>}
    </section>
  );
}