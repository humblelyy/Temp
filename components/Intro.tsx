"use client";
import { useEffect, useRef, useState } from "react";
import { createTimeline, stagger } from "animejs";

const GRID = 13;

export default function Intro() {
  const [done, setDone] = useState(false);
  const dots = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.introSeen) { setDone(true); return; }
    const t = setTimeout(() => finish(), 2800);
    return () => clearTimeout(t);
  }, []);

  // Ripple of dots radiating from the centre behind the wordmark (anime.js grid stagger)
  useEffect(() => {
    if (done || !dots.current) return;
    const options = { grid: [GRID, GRID] as [number, number], from: "center" as const };
    const tl = createTimeline({ loop: true, alternate: true })
      .add(dots.current.querySelectorAll(".dot"), {
        scale: stagger([1.1, 0.75], options),
        opacity: stagger([0.9, 0.15], options),
        ease: "inOutQuad",
      }, stagger(200, options));
    return () => { tl.revert(); };
  }, [done]);

  const finish = () => { sessionStorage.setItem("humbl-intro", "1"); setDone(true); };

  return (
    <div className={`intro${done ? " done" : ""}`} aria-hidden={done}>
      {!done && (
        <div ref={dots} className="dot-grid" aria-hidden>
          {Array.from({ length: GRID * GRID }).map((_, i) => <span key={i} className="dot" />)}
        </div>
      )}
      <div style={{ position: "relative" }}>
        <h1 aria-label="HUMBL">
          {"HUMBL".split("").map((c, i) => <span key={i} style={{ animationDelay: `${i * 0.08}s` }}>{c}</span>)}
        </h1>
        <div className="sub">Wallpapers</div>
      </div>
      {!done && <button className="skip glass press" onClick={finish}>Skip intro</button>}
    </div>
  );
}
