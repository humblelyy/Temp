import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container page" style={{ minHeight: "70vh" }}>
      <div className="eyebrow">404</div>
      <h1 className="serif">This frame is empty.</h1>
      <p className="prose">The page you’re looking for moved or never existed.</p>
      <Link className="btn primary" href="/" style={{ marginTop: 16 }}>Back to wallpapers</Link>
    </div>
  );
}
