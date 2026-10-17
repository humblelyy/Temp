"use client";
import { useEffect, useState } from "react";
import type { Wallpaper } from "@/lib/wallpapers";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "video/mp4"];
const MAX_MB = 50;

export default function Admin() {
  const [rows, setRows] = useState<Wallpaper[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => { fetch("/api/wallpapers").then((r) => r.json()).then(setRows); }, []);

  const onFile = async (f?: File) => {
    setErr(""); setPreview(null);
    if (!f) return;
    if (!ALLOWED.includes(f.type)) return setErr("Unsupported type. Use JPEG, PNG, WebP or MP4.");
    if (f.size > MAX_MB * 1024 * 1024) return setErr(`File exceeds ${MAX_MB} MB.`);
    const head = new Uint8Array(await f.slice(0, 12).arrayBuffer());
    const hex = Array.from(head).map((b) => b.toString(16).padStart(2, "0")).join("");
    const ok = hex.startsWith("ffd8ff") || hex.startsWith("89504e47") || hex.slice(16, 24) === "57454250" || hex.slice(8, 16) === "66747970";
    if (!ok) return setErr("File signature does not match its type.");
    setPreview(URL.createObjectURL(f));
  };
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const total = rows.reduce((s, r) => s + r.downloads, 0);
  return (
    <div className="container page">
      <div className="eyebrow">Admin · demo</div>
      <h1 className="serif">Library</h1>
      <p style={{ color: "var(--muted)", marginTop: -8, marginBottom: 28 }}>Prototype only: changes are local to this session. Real admin requires server-side auth and storage.</p>
      <div className="stats">
        <div className="stat">Wallpapers<b>{rows.length}</b></div>
        <div className="stat">Published<b>{rows.filter((r) => r.published).length}</b></div>
        <div className="stat">Downloads<b>{total.toLocaleString()}</b></div>
        <div className="stat">Live<b>{rows.filter((r) => r.kind === "live").length}</b></div>
      </div>

      <section className="stat" style={{ marginBottom: 32, display: "grid", gap: 12 }}>
        <strong>Upload</strong>
        <input className="field" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="field" type="file" accept={ALLOWED.join(",")} onChange={(e) => onFile(e.target.files?.[0])} />
        {err && <p role="alert" style={{ color: "#ff8f8f", margin: 0 }}>{err}</p>}
        {preview && <img src={preview} alt="Upload preview" style={{ maxWidth: 220, borderRadius: 12 }} />}
        <button className="btn primary" disabled style={{ justifySelf: "start" }} title="Storage backend not connected">Publish (backend required)</button>
      </section>

      <div style={{ overflowX: "auto" }}>
        <table className="admin">
          <thead><tr><th>Title</th><th>Type</th><th>Category</th><th>Downloads</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.title}</td><td>{r.kind}</td><td>{r.category}</td><td>{r.downloads.toLocaleString()}</td>
                <td><button className="btn" style={{ minHeight: 36, padding: "6px 14px" }} onClick={() => setRows(rows.map((x) => x.id === r.id ? { ...x, published: !x.published } : x))}>{r.published ? "Published" : "Draft"}</button></td>
                <td><button className="btn" style={{ minHeight: 36, padding: "6px 14px" }} onClick={() => setRows(rows.filter((x) => x.id !== r.id))} aria-label={`Delete ${r.title}`}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
