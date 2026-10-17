"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Browse" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function Nav() {
  const path = usePathname();
  const wrap = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = wrap.current?.querySelector<HTMLElement>('[aria-current="page"]');
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [path]);

  return (
    <header className="nav glass" role="banner">
      <Link href="/" className="nav-brand" aria-label="HUMBL Wallpapers home">
        <img src="/assets/humbl-main-logo.svg" alt="" width={30} height={30} />
        <span>HUMBL</span>
      </Link>
      <nav aria-label="Primary">
        <div className="nav-links" ref={wrap}>
          {pill && <span className="nav-pill" style={{ left: pill.left, width: pill.width }} aria-hidden />}
          {links.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className="nav-link" aria-current={active ? "page" : undefined}>
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
