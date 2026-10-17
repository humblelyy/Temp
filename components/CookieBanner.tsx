"use client";
import { useEffect, useState } from "react";

type Prefs = { necessary: true; analytics: boolean; ads: boolean };
const KEY = "humbl-cookie-prefs";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ necessary: true, analytics: false, ads: false });

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setPrefs(JSON.parse(saved)); else setOpen(true);
    const h = () => setOpen(true);
    window.addEventListener("open-cookie-prefs", h);
    return () => window.removeEventListener("open-cookie-prefs", h);
  }, []);

  const save = (p: Prefs) => { localStorage.setItem(KEY, JSON.stringify(p)); setPrefs(p); setOpen(false); };
  if (!open) return null;

  return (
    <div className="cookie glass" role="dialog" aria-label="Cookie preferences">
      <strong style={{ display: "block", marginBottom: 6 }}>Cookie preferences</strong>
      <p style={{ margin: "0 0 12px", color: "var(--muted)", lineHeight: 1.5 }}>Necessary storage keeps favorites and these choices. Optional categories stay off until you allow them.</p>
      {(["analytics", "ads"] as const).map((k) => (
        <label key={k} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, minHeight: 32 }}>
          <input type="checkbox" checked={prefs[k]} onChange={(e) => setPrefs({ ...prefs, [k]: e.target.checked })} />
          {k === "analytics" ? "Anonymous analytics" : "Advertising"}
        </label>
      ))}
      <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
        <button className="btn" onClick={() => save({ necessary: true, analytics: false, ads: false })}>Reject optional</button>
        <button className="btn" onClick={() => save(prefs)}>Save</button>
        <button className="btn primary" onClick={() => save({ necessary: true, analytics: true, ads: true })}>Accept all</button>
      </div>
    </div>
  );
}
