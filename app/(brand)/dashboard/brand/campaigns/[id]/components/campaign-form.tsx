"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  CAMPAIGNS_PATH,
  button,
  control,
  panel,
  platforms,
  type Campaign,
  type Platform,
} from "../../data/campaign-data";
import CampaignDetails from "./campaign-details";

export default function CampaignForm({ source }: { source?: Campaign }) {
  const [title, setTitle] = useState(source ? `${source.title} (copy)` : "");
  const [description, setDescription] = useState(source?.description ?? "");
  const [budget, setBudget] = useState(source ? String(source.budget) : "");
  const [deadline, setDeadline] = useState("");
  const [selected, setSelected] = useState<Platform[]>(
    source?.platforms ?? ["Instagram"],
  );
  const [preview, setPreview] = useState<Campaign | null>(null);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(budget);
    if (
      !title.trim() ||
      !description.trim() ||
      !selected.length ||
      !deadline ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setError(
        "Enter a name, brief, positive budget, deadline and at least one platform.",
      );
      return;
    }
    setError("");
    setPreview({
      id: 0,
      title: title.trim(),
      description: description.trim(),
      icon: "◇",
      status: "draft",
      platforms: selected,
      budget: amount,
      spent: 0,
      creators: [],
      reach: 0,
      engagement: null,
      progress: 0,
      deadline,
      daysLeft: null,
      updatedAt: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <div className="space-y-5">
      <Link href={CAMPAIGNS_PATH} className="text-sm text-[#746d63]">
        ← All campaigns
      </Link>
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {source ? "Duplicate campaign" : "New campaign"}
        </h1>
        <p className="mt-2 text-sm text-[#746d63]">
          Build your brief and preview it before saving.
        </p>
      </header>
      <form
        onSubmit={submit}
        onChange={() => setPreview(null)}
        className={`${panel} space-y-5`}
      >
        <label className="block text-sm font-medium">
          Campaign name
          <input
            required
            maxLength={120}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${control} mt-2 w-full`}
            placeholder="Winter skin reset"
          />
        </label>
        <label className="block text-sm font-medium">
          Campaign brief
          <textarea
            required
            rows={4}
            maxLength={3000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${control} mt-2 w-full resize-y`}
            placeholder="Describe your goals and expected content…"
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Budget (₹)
            <input
              required
              type="number"
              min="1"
              max="1000000000"
              step="1"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={`${control} mt-2 w-full`}
            />
          </label>
          <label className="block text-sm font-medium">
            Deadline
            <input
              required
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={`${control} mt-2 w-full`}
            />
          </label>
        </div>
        <fieldset>
          <legend className="text-sm font-medium">Platforms</legend>
          <div className="mt-3 flex flex-wrap gap-4">
            {platforms.map((platform) => (
              <label key={platform} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selected.includes(platform)}
                  onChange={(e) =>
                    setSelected(
                      e.target.checked
                        ? [...selected, platform]
                        : selected.filter((item) => item !== platform),
                    )
                  }
                  className="size-4 accent-[#23796e]"
                />
                {platform}
              </label>
            ))}
          </div>
        </fieldset>
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="flex flex-wrap justify-end gap-3">
          <Link href={CAMPAIGNS_PATH} className={button}>
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-xl bg-[#e99735] px-4 py-2.5 text-sm font-semibold text-[#2b1d08] hover:bg-[#f0a547]"
          >
            Preview draft
          </button>
        </div>
      </form>
      {preview && (
        <div className="space-y-3">
          <p
            role="status"
            className="rounded-xl bg-[#fff0d8] p-3 text-sm text-[#91530d]"
          >
            Draft preview only. This campaign has not been saved.
          </p>
          <CampaignDetails campaign={preview} />
        </div>
      )}
    </div>
  );
}
