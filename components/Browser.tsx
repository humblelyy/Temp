"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Wallpaper } from "@/lib/wallpapers";
import WallpaperImage from "./WallpaperImage";

const FAV = "humbl-favorites";

export default function Browser({ categories }: { categories: string[] }) {
  const [items, setItems] = useState<Wallpaper[] | null>(null);
  const [q, setQ] = useState("");
  const [kind, setKind] = useState("all");
  const [device, setDevice] = useState("all");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("new");
  const [favOnly, setFavOnly] = useState(false);
  const [favs, setFavs] = useState<string[]>([]);
  const [open, setOpen] = useState<Wallpaper | null>(null);
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/wallpapers").then((r) => r.json()).then(setItems).catch(() => setItems([]));
    setFavs(JSON.parse(localStorage.getItem(FAV) || "[]"));
  }, []);

  const toggleFav = (id: string) => {
    const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
    setFavs(next); localStorage.setItem(FAV, JSON.stringify(next));
  };

  const list = useMemo(() => {
    if (!items) return [];
    const term = q.trim().toLowerCase();
    const r = items.filter((w) =>
      (!term || w.title.toLowerCase().includes(term) || w.tags.some((t) => t.includes(term))) &&
      (kind === "all" || w.kind === kind) &&
      (device === "all" || w.devices.includes(device as Wallpaper["devices"][number])) &&
      (cat === "all" || w.category === cat) &&
      (!favOnly || favs.includes(w.id)));
    return r.sort((a, b) => sort === "popular" ? b.downloads - a.downloads : sort === "az" ? a.title.localeCompare(b.title) : b.added.localeCompare(a.added));
  }, [items, q, kind, device, cat, sort, favOnly, favs]);

  // staggered reveal
  useEffect(() => {
    const els = grid.current?.querySelectorAll<HTMLElement>(".card:not(.in)");
    if (!els?.length) return;
    const io = new IntersectionObserver((entries) => {
      let i = 0;
      entries.forEach((e) => {
        if (e.isIntersecting) { const el = e.target as HTMLElement; el.style.transitionDelay = `${(i++ % 6) * 60}ms`; el.classList.add("in"); io.unobserve(el); }
      });
    }, { rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [list]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <section className="container" id="browse" aria-label="Browse wallpapers">
      <div className="toolbar">
        <input className="field search" type="search" placeholder="Search titles or tags — fog, night, minimal…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search wallpapers" />
        <select className="field" value={kind} onChange={(e) => setKind(e.target.value)} aria-label="Format"><option value="all">Still & live</option><option value="still">Still</option><option value="live">Live</option></select>
        <select className="field" value={device} onChange={(e) => setDevice(e.target.value)} aria-label="Device"><option value="all">All devices</option><option value="phone">Phone</option><option value="tablet">Tablet</option><option value="desktop">Desktop</option></select>
        <select className="field" value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category"><option value="all">All categories</option>{categories.map((c) => <option key={c}>{c}</option>)}</select>
        <select className="field" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort"><option value="new">Newest</option><option value="popular">Most downloaded</option><option value="az">A–Z</option></select>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, color: "var(--muted)", fontSize: 14 }}>
        <span aria-live="polite">{items ? `${list.length} wallpaper${list.length === 1 ? "" : "s"}` : "Loading…"}</span>
        <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
          <input type="checkbox" checked={favOnly} onChange={(e) => setFavOnly(e.target.checked)} /> Favorites only ({favs.length})
        </label>
      </div>

      <div className="grid" ref={grid}>
        {!items && Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton" style={{ aspectRatio: i % 3 === 1 ? "16/9" : "9/16" }} aria-hidden />)}
        {list.map((w, i) => (
          <div key={w.id} className="card" style={{ position: "relative" }}>
            <button onClick={() => setOpen(w)} style={{ all: "unset", display: "block", width: "100%", cursor: "pointer" }} aria-label={`Open ${w.title}`}>
              <WallpaperImage src={w.preview} alt={`${w.title} — ${w.category} wallpaper`} width={w.width} height={w.height} eager={i < 4} />
              <div className="card-meta">
                <strong>{w.title}</strong>
                <span className={`badge${w.kind === "live" ? " live" : ""}`}>{w.kind === "live" ? "Live" : w.format}</span>
              </div>
            </button>
            <button className="fav glass" onClick={() => toggleFav(w.id)} aria-pressed={favs.includes(w.id)} aria-label={favs.includes(w.id) ? `Remove ${w.title} from favorites` : `Add ${w.title} to favorites`}>
              {favs.includes(w.id) ? "♥" : "♡"}
            </button>
          </div>
        ))}
      </div>
      {items && !list.length && <p style={{ color: "var(--muted)", padding: "48px 0", textAlign: "center" }}>Nothing matches those filters yet.</p>}

      {open && (
        <div className="modal-back" onClick={() => setOpen(null)}>
          <div className="modal glass" role="dialog" aria-modal="true" aria-labelledby="wp-title" onClick={(e) => e.stopPropagation()}>
            <div className="modal-img"><WallpaperImage src={open.preview} alt={open.title} width={open.width} height={open.height} eager /></div>
            <div className="modal-body">
              <div>
                <div className="eyebrow">{open.category} · {open.kind === "live" ? "Live wallpaper" : "Still wallpaper"}</div>
                <h2 id="wp-title" className="serif" style={{ fontSize: 38, margin: "8px 0 0" }}>{open.title}</h2>
              </div>
              <dl className="meta-table">
                <dt>Resolution</dt><dd>{open.width} × {open.height}</dd>
                <dt>Format</dt><dd>{open.format}</dd>
                <dt>File size</dt><dd>{open.sizeMB.toFixed(1)} MB</dd>
                <dt>Devices</dt><dd style={{ textTransform: "capitalize" }}>{open.devices.join(", ")}</dd>
                <dt>Compatibility</dt><dd>{open.compatibility}</dd>
                <dt>Tags</dt><dd>{open.tags.map((t) => `#${t}`).join(" ")}</dd>
              </dl>
              <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>Prototype: original-file downloads require the server-side signed-URL backend, which is not connected yet.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                <button className="btn primary" disabled title="Backend not connected in Prototype V2">Download original</button>
                <button className="btn" onClick={() => toggleFav(open.id)} aria-pressed={favs.includes(open.id)}>{favs.includes(open.id) ? "♥ Saved" : "♡ Favorite"}</button>
                <button className="btn" onClick={() => setOpen(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
