"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container foot">
        <div>
          <div style={{ color: "var(--fg)", fontWeight: 600, letterSpacing: ".04em" }}>HUMBL Wallpapers</div>
          <div style={{ marginTop: 6 }}>Prototype V2 · A HUMBLE brand project</div>
        </div>
        <nav aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/copyright">Copyright</Link>
          <Link href="/legal/accessibility">Accessibility</Link>
          <button onClick={() => window.dispatchEvent(new Event("open-cookie-prefs"))} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", color: "inherit" }}>
            Cookie preferences
          </button>
        </nav>
      </div>
    </footer>
  );
}
