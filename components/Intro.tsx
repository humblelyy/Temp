"use client";
import { useEffect, useState } from "react";

export default function Intro() {
  const [done, setDone] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("humbl-intro") || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDone(false);
    const t = setTimeout(() => finish(), 2600);
    return () => clearTimeout(t);
  }, []);
  const finish = () => { sessionStorage.setItem("humbl-intro", "1"); setDone(true); };

  return (
    <div className={`intro${done ? " done" : ""}`} aria-hidden={done}>
      <div>
        <h1 aria-label="HUMBL">
          {"HUMBL".split("").map((c, i) => <span key={i} style={{ animationDelay: `${i * 0.08}s` }}>{c}</span>)}
        </h1>
        <div className="sub">Wallpapers</div>
      </div>
      {!done && <button className="skip glass" onClick={finish}>Skip intro</button>}
    </div>
  );
}
