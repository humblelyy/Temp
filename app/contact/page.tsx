"use client";
import { useState } from "react";
export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container page">
      <div className="eyebrow">Contact</div>
      <h1 className="serif">Say hello.</h1>
      {sent ? <p className="prose">Thanks — in this prototype messages are not delivered yet. A backend form endpoint is still to be connected.</p> : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
          <label>Name<input required className="field" style={{ marginTop: 6 }} /></label>
          <label>Email<input required type="email" className="field" style={{ marginTop: 6 }} /></label>
          <label>Message<textarea required rows={5} className="field" style={{ marginTop: 6 }} /></label>
          <button className="btn primary" type="submit" style={{ justifySelf: "start" }}>Send message</button>
        </form>
      )}
    </div>
  );
}
