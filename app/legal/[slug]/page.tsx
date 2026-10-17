import { notFound } from "next/navigation";

const docs: Record<string, { title: string; body: [string, string][] }> = {
  privacy: { title: "Privacy policy", body: [["What we store", "Favorites and cookie choices are stored only in your browser’s local storage. Optional analytics and advertising remain off unless you enable them."], ["Contact", "Use the contact page to request access to or deletion of any data."]] },
  terms: { title: "Terms of use", body: [["Personal use", "Wallpapers are licensed for personal device use only. Redistribution or resale is not permitted."], ["Prototype", "This prototype is provided as-is for review."]] },
  copyright: { title: "Copyright & takedown", body: [["Reporting", "If you believe content infringes your rights, send the URL, proof of ownership and your contact details through the contact page. We review every notice and remove infringing content promptly."]] },
  accessibility: { title: "Accessibility", body: [["Commitment", "We aim for WCAG 2.2 AA: keyboard navigation, visible focus, reduced-motion support, descriptive alt text and sufficient contrast."], ["Feedback", "Report barriers through the contact page."]] },
  cookies: { title: "Cookie policy", body: [["Categories", "Necessary (favorites, preferences), Analytics (optional), Advertising (optional). Change choices anytime via “Cookie preferences” in the footer."]] },
};

export function generateStaticParams() { return Object.keys(docs).map((slug) => ({ slug })); }

export default async function Legal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = docs[slug];
  if (!d) notFound();
  return (
    <div className="container page">
      <div className="eyebrow">Legal</div>
      <h1 className="serif">{d.title}</h1>
      <div className="prose">{d.body.map(([h, p]) => <section key={h}><h2>{h}</h2><p>{p}</p></section>)}</div>
    </div>
  );
}
