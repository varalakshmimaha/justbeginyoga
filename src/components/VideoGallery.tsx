"use client";

import { useState } from "react";
import Image from "next/image";

export type VideoItem = {
  id: number;
  title: string;
  youtubeId: string;
  description: string | null;
  category: string;
};

function PlayIcon() {
  return (
    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] transition group-hover:scale-110 group-hover:bg-white">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="ml-1 text-green-deep">
        <path d="M5 3.5v17l15-8.5z" fill="currentColor" />
      </svg>
    </span>
  );
}

export default function VideoGallery({ videos }: { videos: VideoItem[] }) {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => (
        <article
          key={v.id}
          className="overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-white shadow-[0_20px_44px_-28px_rgba(20,40,20,0.4)] transition hover:-translate-y-1"
        >
          <div className="relative aspect-video w-full bg-black">
            {playing === v.id ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(v.id)}
                aria-label={`Play ${v.title}`}
                className="group absolute inset-0 h-full w-full cursor-pointer"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt={v.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/15 transition group-hover:bg-black/30">
                  <PlayIcon />
                </span>
              </button>
            )}
          </div>
          <div className="p-6">
            <div className="mb-2 text-[12px] uppercase tracking-[0.16em] text-olive">{v.category}</div>
            <h2 className="m-0 font-serif text-[21px] font-semibold leading-[1.2] text-green-deep">{v.title}</h2>
            {v.description && (
              <p className="mt-2.5 line-clamp-3 text-[14.5px] font-light leading-[1.6] text-muted">{v.description}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
