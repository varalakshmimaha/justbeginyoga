"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

export type GalleryItem = {
  id: number;
  imageUrl: string;
  title: string | null;
  caption: string | null;
  category: string;
};

export default function GalleryGrid({ images }: { images: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const show = useCallback(
    (dir: 1 | -1) =>
      setActive((i) =>
        i === null ? i : (i + dir + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(1);
      if (e.key === "ArrowLeft") show(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, show]);

  const current = active === null ? null : images[active];

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(i)}
            className="group block w-full cursor-zoom-in overflow-hidden rounded-[18px] border border-[var(--color-line)] bg-[#e8e4d4] text-left shadow-[0_18px_40px_-28px_rgba(20,40,20,0.45)] transition hover:-translate-y-1"
          >
            <span className="relative block w-full">
              <Image
                src={img.imageUrl}
                alt={img.title || img.caption || "Just Begin Yoga gallery image"}
                width={600}
                height={750}
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {(img.title || img.caption) && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 pt-10 opacity-0 transition group-hover:opacity-100">
                  {img.title && (
                    <span className="block font-serif text-[16px] font-semibold text-white">{img.title}</span>
                  )}
                  {img.caption && (
                    <span className="mt-0.5 block text-[12.5px] font-light text-white/85">{img.caption}</span>
                  )}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
          >
            ×
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => { e.stopPropagation(); show(-1); }}
                className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(e) => { e.stopPropagation(); show(1); }}
                className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:right-6"
              >
                ›
              </button>
            </>
          )}
          <figure onClick={(e) => e.stopPropagation()} className="max-h-[88vh] max-w-[1100px]">
            <Image
              src={current.imageUrl}
              alt={current.title || current.caption || "Just Begin Yoga gallery image"}
              width={1200}
              height={1500}
              className="mx-auto max-h-[80vh] w-auto rounded-[14px] object-contain"
            />
            {(current.title || current.caption) && (
              <figcaption className="mt-3 text-center text-cream">
                {current.title && <span className="font-serif text-[18px] font-semibold">{current.title}</span>}
                {current.caption && <span className="mt-0.5 block text-[13.5px] font-light text-white/75">{current.caption}</span>}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
