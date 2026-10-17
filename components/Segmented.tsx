"use client";
import { useLayoutEffect, useRef, useState } from "react";

export default function Segmented({ value, options, onChange, label }: { value: string; options: { value: string; label: string }[]; onChange: (v: string) => void; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState<{ left: number; width: number } | null>(null);
  useLayoutEffect(() => {
    const m = () => { const el = ref.current?.querySelector<HTMLElement>('[aria-pressed="true"]'); if (el) setT({ left: el.offsetLeft, width: el.offsetWidth }); };
    m(); addEventListener("resize", m); return () => removeEventListener("resize", m);
  }, [value]);
  return (
    <div className="seg" role="group" aria-label={label} ref={ref}>
      {t && <span className="seg-thumb" style={{ left: t.left, width: t.width }} aria-hidden />}
      {options.map((o) => (
        <button key={o.value} type="button" className="press" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}
