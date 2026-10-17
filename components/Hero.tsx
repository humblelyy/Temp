"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { if (img.current && scrollY < 1000) img.current.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`; }); };
    addEventListener("scroll", on, { passive: true });
    return () => { removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="hero">
      <img ref={img} src="https://picsum.photos/seed/quiet-ridge/1920/1200" alt="" fetchPriority="high" />
      <div className="hero-copy container">
        <div className="eyebrow">Issue 02 · Autumn collection</div>
        <h1 className="serif">Quiet images for loud screens.</h1>
        <p>A small, curated library of still and live wallpapers — photographed, graded and sized for the devices you actually use.</p>
      </div>
    </section>
  );
}
