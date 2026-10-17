"use client";
import { useState } from "react";

export default function WallpaperImage({ src, alt, width, height, eager, onLoad }: { src: string; alt: string; width: number; height: number; eager?: boolean; onLoad?: () => void }) {
  const [s, setS] = useState(src);
  return (
    <img src={s} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} decoding="async"
      style={{ aspectRatio: `${width} / ${height}` }}
      onLoad={onLoad}
      onError={() => { if (s !== "/assets/no-image-available.svg") setS("/assets/no-image-available.svg"); }} />
  );
}
