"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);
const links = [
  { href: "/", label: "Browse", d: "M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" },
  { href: "/about", label: "About", d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01" },
  { href: "/contact", label: "Contact", d: "M4 6h16v12H4zM4 7l8 6 8-6" },
  { href: "/admin", label: "Admin", d: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" },
];

export default function Nav() {
  const path = usePathname();
  const wrap = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const el = wrap.current?.querySelector<HTMLElement>('[aria-current="page"]');
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    const p = pillRef.current;
    if (p) { p.classList.remove("jelly"); void p.offsetWidth; p.classList.add("jelly"); }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [path]);

  // collapse while scrolling down, spring back on scroll up (like iOS tab bars)
  useEffect(() => {
    let last = scrollY;
    const on = () => { const y = scrollY; if (Math.abs(y - last) > 8) { setHidden(y > last && y > 300); last = y; } };
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`nav glass${hidden ? " hidden" : ""}`}>
      <Link href="/" className="nav-brand press" aria-label="HUMBL Wallpapers home">
        <img src="/assets/humbl-main-logo.svg" alt="" width={34} height={34} style={{ borderRadius: 10 }} />
        <span>HUMBL</span>
      </Link>
      <nav aria-label="Primary">
        <div className="nav-links" ref={wrap}>
          <span ref={pillRef} className="nav-pill" style={pill ? { left: pill.left, width: pill.width } : { opacity: 0 }} aria-hidden />
          {links.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className="nav-link press" aria-current={active ? "page" : undefined}>
                {icon(l.d)}{l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
