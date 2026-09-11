import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import type { Creator } from "../types/creators";
import { Button, inputClass } from "./results-toolbar";

export default function ContactDialog({
  creator,
  onClose,
}: {
  creator: Creator;
  onClose: () => void;
}) {
  const [subject, setSubject] = useState("Brand collaboration");
  const [message, setMessage] = useState(
    `Hi ${creator.name.split(" ")[0]}, we would love to discuss a collaboration with you.`,
  );
  const [error, setError] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  function downloadDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!subject.trim() || !message.trim()) {
      setError("Add a subject and message.");
      return;
    }
    setError("");

    // Safely format the handle only if it exists in the database
    const handleText = creator.handle ? ` (${creator.handle})` : "";

    const file = new Blob(
      [
        `To: ${creator.name}${handleText}\nSubject: ${subject.trim()}\n\n${message.trim()}`,
      ],
      { type: "text/plain;charset=utf-8" },
    );
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `collaboration-draft-${creator.id}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }

  return (
    <Dialog title={`Contact ${creator.name}`} onClose={onClose}>
      <p className="mb-5 text-sm text-[#6b6558]">
        Prepare a collaboration message. This preview downloads a draft; it does
        not send a message.
      </p>
      <form
        className="space-y-4"
        onSubmit={downloadDraft}
        onChange={() => setDownloaded(false)}
      >
        <label className="block text-sm font-medium">
          Subject
          <input
            required
            maxLength={160}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`${inputClass} mt-2`}
          />
        </label>
        <label className="block text-sm font-medium">
          Message
          <textarea
            required
            maxLength={5000}
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} mt-2 resize-y`}
          />
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        {downloaded && (
          <p role="status" className="text-sm text-[#0e463e]">
            Draft download requested. Nothing was sent.
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} className="cursor-pointer">
            Cancel
          </Button>
          <Button type="submit" tone="primary" className="cursor-pointer">
            Download draft
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export function Dialog({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      dialog?.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={() => {
        if (!ref.current?.open) onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-4xl overflow-y-auto rounded-2xl border border-[#e2dbc8] bg-[#faf7f0] p-0 text-[#1c1b1f] shadow-xl backdrop:bg-black/50"
    >
      <div className="p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-xl font-semibold">
            {title}
          </h2>
          <Button
            autoFocus
            onClick={onClose}
            aria-label="Close dialog"
            className="cursor-pointer"
          >
            ×
          </Button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
