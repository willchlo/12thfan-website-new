"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

import CardSwap, { Card } from "@/components/card-swap/CardSwap";

type FeedComment = {
  author: string;
  text: string;
};

type FeedPost = {
  id: string;
  name: string;
  date: string;
  body: string;
  likes: number;
  comments: number;
  avatarSrc: string;
  mediaSrc: string;
  mediaAlt: string;
  /** Shown under the action row – compact preview thread */
  commentsPreview: readonly FeedComment[];
};

const FEED_POSTS: FeedPost[] = [
  {
    id: "holly",
    name: "Holly Baker",
    date: "30/03/2026",
    body: "Nothing beats a Lionesses away day — full stand, full voice. That’s the standard 🦁",
    likes: 48,
    comments: 2,
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&q=80",
    mediaSrc: "/social/stadium-crowd.png",
    mediaAlt: "Crowd of supporters seated in a stadium, seen from behind",
    commentsPreview: [
      { author: "Alex T.", text: "England away hits different when the whole block’s bouncing." },
      { author: "Jordan", text: "Lionesses fans are loud — wish I’d been in your row!" },
    ],
  },
  {
    id: "mia",
    name: "Mia Collins",
    date: "28/03/2026",
    body: "Boxpark before Wembley for the Lionesses 💚",
    likes: 24,
    comments: 5,
    avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&q=80",
    mediaSrc: "/social/boxpark-wembley.png",
    mediaAlt: "Busy indoor social venue at Boxpark Wembley with crowds and tables",
    commentsPreview: [
      { author: "Riya", text: "This is the energy before a big WSL or England night." },
      { author: "Chris", text: "Who are we seeing first — Arsenal Women or the Lionesses next?" },
      { author: "Bo", text: "Saved this for the group chat. Up the Arsenal." },
    ],
  },
  {
    id: "sam",
    name: "Sam Rivera",
    date: "26/03/2026",
    body: "Under the lights when it matters — sellout energy, flares up, goosebumps. Lionesses nights hit different ✨",
    likes: 112,
    comments: 4,
    avatarSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop&q=80",
    mediaSrc: "/social/matchday-corner.png",
    mediaAlt: "Football stadium corner with pyrotechnics and packed stands at dusk",
    commentsPreview: [
      { author: "Taylor", text: "This is what backing the national team looks like." },
      { author: "Neve", text: "Arsenal Women at the Emirates next for me — same buzz?" },
      { author: "Mo", text: "WSL + Lionesses season has been non-stop quality." },
    ],
  },
  {
    id: "ava",
    name: "Ava Chen",
    date: "23/03/2026",
    body: "Arsenal Women at the Emirates — scarves up, whole place singing. No place I’d rather be ❤️🤍",
    likes: 67,
    comments: 3,
    avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&q=80",
    mediaSrc: "/social/emirates-arsenal.png",
    mediaAlt: "Fans in the stands at Emirates Stadium with Arsenal scarves and the pitch in view",
    commentsPreview: [
      { author: "Priya", text: "The women’s team at this ground — nothing like it." },
      { author: "Leo", text: "That scoreboard shot 😮‍💨 COYG." },
      { author: "Sam K.", text: "If you’ve not been to a WSL game here yet, sort it." },
    ],
  },
];

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="6" cy="12" r="1.85" />
      <circle cx="12" cy="12" r="1.85" />
      <circle cx="18" cy="12" r="1.85" />
    </svg>
  );
}

function SmileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M8.5 14.5s1.8 2 3.5 2 3.5-2 3.5-2M9 9h.02M15 9h.02" />
    </svg>
  );
}

function CommentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M6 4a2 2 0 012-2h8a2 2 0 012 2v18l-7-4.12L6 22V4z"
      />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  );
}

function SocialFeedCard({ post }: { post: FeedPost }) {
  return (
    <div className="flex h-full cursor-default flex-col p-5 pb-4 text-left [font-family:var(--font-geist-sans),ui-sans-serif]">
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Image
            src={post.avatarSrc}
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full border border-zinc-200 object-cover dark:border-zinc-600"
          />
          <div className="min-w-0 pt-0.5">
            <p className="truncate font-bold leading-tight text-[var(--brand-forest)] dark:text-emerald-950">
              {post.name}
            </p>
            <p className="mt-0.5 text-sm font-normal text-zinc-500 dark:text-zinc-500">{post.date}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-[var(--brand-forest)] ring-1 ring-emerald-600/10 dark:bg-emerald-100/90 dark:text-emerald-950 dark:ring-emerald-700/15">
            Friend
          </span>
          <button
            type="button"
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-200/80 dark:hover:text-zinc-700"
            aria-label="Post options"
          >
            <MoreIcon className="size-5" />
          </button>
        </div>
      </header>

      <p className="mt-4 text-[0.9375rem] font-semibold leading-snug text-[var(--brand-forest)] dark:text-emerald-950 sm:text-base">
        {post.body}
      </p>

      <div className="relative mt-4 aspect-[20/11] w-full overflow-hidden rounded-xl border border-zinc-100 bg-zinc-100 dark:border-zinc-200/80 dark:bg-zinc-200/60">
        <Image src={post.mediaSrc} alt={post.mediaAlt} fill className="object-cover" sizes="(max-width: 520px) 92vw, 420px" />
      </div>

      <footer className="mt-3 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-600">
          <span className="text-base leading-none text-red-500" aria-hidden>
            ♥
          </span>
          <span>{post.likes}</span>
        </div>
        <hr className="border-0 border-t border-zinc-200 dark:border-zinc-300/80" />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-zinc-400 dark:text-zinc-500">
          <button type="button" className="rounded-md p-1 transition-colors hover:text-zinc-600 dark:hover:text-zinc-700" aria-label="React">
            <SmileIcon className="size-[22px]" />
          </button>
          <span className="inline-flex items-center gap-1.5">
            <CommentIcon className="size-[22px]" />{" "}
            <span className="text-sm tabular-nums text-zinc-500 dark:text-zinc-600">{post.comments}</span>
          </span>
          <BookmarkIcon className="size-[21px] text-emerald-600 dark:text-emerald-700" />
          <button type="button" className="rounded-md p-1 transition-colors hover:text-zinc-600 dark:hover:text-zinc-700" aria-label="Share">
            <ShareIcon className="size-[22px]" />
          </button>
        </div>

        <div
          className="mt-3 max-h-[132px] space-y-2 overflow-y-auto rounded-xl border border-zinc-100 bg-zinc-50/95 px-3 py-2.5 dark:border-zinc-700/80 dark:bg-zinc-900/55"
          aria-label="Recent comments"
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Comments
          </p>
          <ul className="space-y-2.5">
            {post.commentsPreview.map((c, idx) => (
              <li key={`${post.id}-c-${idx}`} className="flex gap-2.5">
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[0.65rem] font-bold leading-none text-emerald-900 dark:bg-emerald-900/85 dark:text-emerald-100"
                  aria-hidden
                >
                  {c.author
                    .split(/\s+/)
                    .map((w) => w[0] ?? "")
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="text-[0.7rem] font-semibold leading-tight text-zinc-800 dark:text-zinc-100">{c.author}</p>
                  <p className="mt-0.5 text-[0.75rem] leading-snug text-zinc-600 dark:text-zinc-400">{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
          {post.comments > post.commentsPreview.length ?
            <p className="border-t border-zinc-200/80 pt-2 text-center text-[0.65rem] font-medium text-zinc-400 dark:border-zinc-600/60 dark:text-zinc-500">
              +{post.comments - post.commentsPreview.length} more
            </p>
          : null}
        </div>
      </footer>
    </div>
  );
}

export default function SocialCardSwap() {
  const measureRef = useRef<HTMLDivElement>(null);
  const [{ width, height, cardDistance, verticalDistance }, setDims] = useState({
    width: 340,
    height: 556,
    cardDistance: 40,
    verticalDistance: 43,
  });

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const baseW = 440;
    const baseH = 720;
    const sync = () => {
      const w = Math.min(baseW, Math.max(280, Math.floor(el.getBoundingClientRect().width)));
      const scale = w / baseW;
      setDims({
        width: w,
        height: Math.round(baseH * scale),
        cardDistance: Math.round(52 * scale),
        verticalDistance: Math.round(56 * scale),
      });
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={measureRef}
      className="relative mx-auto min-h-[min(640px,90vh)] w-full max-w-[min(94vw,460px)] overflow-x-clip py-8 lg:mx-0"
    >
      <CardSwap
        containerClassName="card-swap-container--page card-swap-container--align-end"
        width={width}
        height={height}
        cardDistance={cardDistance}
        verticalDistance={verticalDistance}
        delay={5200}
        pauseOnHover={false}
        skewAmount={5}
        easing="elastic"
      >
        {FEED_POSTS.map((post) => (
          <Card key={post.id} customClass="social-feed-card overflow-hidden shadow-sm">
            <SocialFeedCard post={post} />
          </Card>
        ))}
      </CardSwap>
    </div>
  );
}
