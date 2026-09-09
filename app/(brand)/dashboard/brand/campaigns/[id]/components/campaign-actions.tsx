"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CAMPAIGNS_PATH,
  button,
  type Campaign,
} from "../../data/campaign-data";

export default function CampaignActions({ campaign }: { campaign: Campaign }) {
  const [message, setMessage] = useState("");

  function downloadReport() {
    const file = new Blob([JSON.stringify(campaign, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `campaign-${campaign.id}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Report download requested.");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={CAMPAIGNS_PATH}
          className="text-sm font-medium text-[#746d63]"
        >
          ← All campaigns
        </Link>
        <div className="flex flex-wrap gap-2">
          <a href="#applications" className={button}>
            View applications
          </a>
          <Link
            href={`${CAMPAIGNS_PATH}/new?duplicate=${campaign.id}`}
            className={button}
          >
            Duplicate
          </Link>
          <button type="button" onClick={downloadReport} className={button}>
            Download report
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm text-[#17685d]" role="status">
        {message}
      </p>
    </div>
  );
}
