import type { MessagePreview } from "@/app/(brand)/dashboard/brand/data/message-card-data";
import { ArrowUpRight, CheckCheck, MessageCircle } from "lucide-react";
import { SectionHeader } from  "@/app/(brand)/dashboard/brand/components/section-header";

export function MessagesCard({ messages }: { messages: MessagePreview[] }) {
  const unreadCount = messages.filter((message) => message.unread).length;

  return (
    <section
      id="messages"
      className="
        scroll-mt-24
        group relative overflow-hidden
        rounded-3xl
        border border-slate-200/80
        bg-white
        p-5
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-slate-300
        hover:shadow-xl hover:shadow-slate-200/50
        sm:p-6
      "
    >
      {/* Background decoration */}
      <div
        className="
          pointer-events-none absolute -right-20 -top-20
          h-48 w-48 rounded-full
          bg-orange-100/60 blur-3xl
          transition-all duration-500
          group-hover:bg-orange-200/70
        "
      />

      <div className="relative">
        {/* Header */}
        <SectionHeader
          title="Recent messages"
          action="Open inbox"
          href="/dashboard/brand/messages"
        />

        {/* Inbox summary */}
        <div
          className="
            mb-5 flex items-center justify-between
            rounded-2xl
            border border-slate-100
            bg-slate-50/70
            p-3.5
            sm:p-4
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                grid h-10 w-10 shrink-0 place-items-center
                rounded-xl
                bg-white
                text-orange-500
                shadow-sm
                ring-1 ring-slate-100
              "
            >
              <MessageCircle className="h-[18px] w-[18px]" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-950">Your inbox</p>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Stay connected with creators
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <span
              className="
                shrink-0 rounded-full
                bg-orange-50
                px-2.5 py-1
                text-[10px] font-bold
                text-orange-600
              "
            >
              {unreadCount} unread
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="space-y-1">
          {messages.map((message) => (
            <article
              key={message.id}
              className="
                group/message
                relative
                flex items-center gap-3
                rounded-2xl
                border border-transparent
                px-2.5 py-3
                transition-all duration-200
                hover:border-slate-100
                hover:bg-slate-50/80
              "
            >
              {/* Avatar */}
              <div
                className={`
                  relative grid h-10 w-10 shrink-0
                  place-items-center rounded-full
                  text-[10px] font-extrabold
                  transition-transform duration-200
                  group-hover/message:scale-105
                  ${
                    message.unread
                      ? "bg-orange-100 text-orange-700 ring-2 ring-orange-100/60"
                      : "bg-slate-100 text-slate-600"
                  }
                `}
              >
                {message.initials}

                {message.unread && (
                  <span
                    className="
                      absolute -right-0.5 -top-0.5
                      h-2.5 w-2.5
                      rounded-full
                      border-2 border-white
                      bg-orange-500
                    "
                  />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className={`
                      truncate text-xs
                      ${
                        message.unread
                          ? "font-bold text-slate-950"
                          : "font-semibold text-slate-700"
                      }
                    `}
                  >
                    {message.name}
                  </h3>

                  <time
                    className="
                      shrink-0
                      text-[9px]
                      font-medium
                      text-slate-400
                    "
                  >
                    {message.time}
                  </time>
                </div>

                <p
                  className={`
                    mt-1 truncate text-[11px] leading-5
                    ${
                      message.unread
                        ? "font-medium text-slate-600"
                        : "text-slate-400"
                    }
                  `}
                >
                  {message.preview}
                </p>
              </div>

              {/* Read / unread indicator */}
              <div className="hidden shrink-0 sm:block">
                {message.unread ? (
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                ) : (
                  <CheckCheck className="h-3.5 w-3.5 text-slate-300" />
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {messages.length === 0 && (
          <div
            className="
              flex flex-col items-center justify-center
              rounded-2xl
              border border-dashed border-slate-200
              bg-slate-50/50
              px-6 py-10
              text-center
            "
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white shadow-sm">
              <MessageCircle className="h-5 w-5 text-slate-400" />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-950">
              No messages yet
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Creator conversations will appear here.
            </p>
          </div>
        )}

        {/* Footer notification */}
        {unreadCount > 0 && (
          <div
            className="
              mt-4 flex items-center justify-between gap-3
              rounded-2xl
              border border-orange-100
              bg-gradient-to-r from-orange-50/80 to-white
              px-3.5 py-3
              sm:px-4
            "
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-slate-700">
                You have{" "}
                <span className="font-bold text-orange-600">
                  {unreadCount} unread
                </span>{" "}
                {unreadCount === 1 ? "conversation" : "conversations"}
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Some creators are waiting for your reply.
              </p>
            </div>

            <a
              href="/dashboard/brand/messages"
              className="
                grid h-9 w-9 shrink-0 place-items-center
                rounded-xl
                bg-white
                text-slate-500
                shadow-sm
                ring-1 ring-slate-100
                transition-all
                hover:text-orange-500
                hover:shadow-md
              "
              aria-label="Open messages"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
