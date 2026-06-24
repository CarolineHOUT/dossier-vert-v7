import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

function normalize(url) {
  if (!url) return "";
  let value = url.trim();
  if (!value.startsWith("http://") && !value.startsWith("https://")) value = "https://" + value;
  return value.replace(/\/$/, "");
}

export default function QRCodePanel({ state, api }) {
  const [value, setValue] = useState(state.meta.publicUrl || "");
  const base = normalize(state.meta.publicUrl) || window.location.origin;
  const url = `${base}/?view=participant&atelier=${state.meta.code}`;
  const isPublic = url.startsWith("https://") && !url.includes("localhost") && !url.includes("192.168.");

  return (
    <section className="qrPanel">
      <span className="eyebrow">Connexion participants</span>
      <h3>{state.meta.code}</h3>
      <div className={isPublic ? "statusOk" : "statusWarn"}>
        <b>{isPublic ? "URL publique prête" : "Adresse locale ou non publique"}</b>
        <span>{base}</span>
      </div>
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="https://dossier-vert.vercel.app" />
      <div className="qrButtons">
        <button onClick={() => api.updatePublicUrl(value)}>Mettre à jour</button>
        <button onClick={() => navigator.clipboard.writeText(url)}>Copier</button>
      </div>
      <div className="qrBox"><QRCodeCanvas value={url} size={220} level="H" includeMargin /></div>
      <small>En présentation, utilisez l’URL Vercel/Firebase publique.</small>
    </section>
  );
}
