import { useState } from "react";
import { authorityOptions, decisions } from "../data/seed";
import { consensus, majority, voteCounts } from "../utils/stats";

function getParticipant() {
  try { const raw = localStorage.getItem("dossierVertParticipant"); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export default function Participant({ state, api }) {
  const [participant, setParticipant] = useState(getParticipant);
  const [remark, setRemark] = useState("");
  const [newDoc, setNewDoc] = useState("");
  const [panel, setPanel] = useState(null);

  const active = state.documents[state.meta.activeDocumentId] || Object.values(state.documents)[0];
  const counts = voteCounts(active);
  const currentVote = participant ? active.votes?.[participant.id]?.value : "";

  async function join(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name")?.trim();
    if (!name) return;
    const p = { id:crypto.randomUUID(), name, fonction:fd.get("fonction") || "", role:"participant", joinedAt:new Date().toLocaleString("fr-FR") };
    localStorage.setItem("dossierVertParticipant", JSON.stringify(p));
    setParticipant(p);
    await api.joinParticipant(p);
  }

  if (!participant) {
    return (
      <section className="phone">
        <div className="phoneLogin">
          <div className="phoneLogo">DV</div><h1>Dossier Vert</h1><p>Rejoindre l’atelier documentaire</p>
          <form onSubmit={join}><input name="name" placeholder="Nom / prénom" /><input name="fonction" placeholder="Fonction / service" /><button>Rejoindre l’atelier</button></form>
        </div>
      </section>
    );
  }

  return (
    <section className="phone">
      <header className="phoneTop"><div><b>Dossier Vert</b><span>Miroir de la projection</span></div><small>{state.meta.code}</small></header>
      <main className="phoneBody">
        <section className="phoneDoc"><span>Document projeté</span><h1>{active.nom}</h1><p>{active.famille} · {active.etape}</p></section>
        <section className="phoneMiniStats"><div><span>Tendance</span><b>{majority(active)}</b></div><div><span>Accord</span><b>{consensus(active)}%</b></div><div><span>Votes</span><b>{Object.values(counts).reduce((a,b)=>a+b,0)}</b></div></section>
        <section className="phonePanel"><label>Autorité parentale</label><div className="phoneSegment">{authorityOptions.map(o => <button key={o} className={active.authority===o ? "selected" : ""} onClick={()=>api.setAuthority(active.id,o,participant.name)}>{o}</button>)}</div></section>
        <section className="phonePanel"><label>Votre qualification</label><div className="phoneVoteGrid">{decisions.map(d => <button key={d} className={currentVote===d ? "selected" : ""} onClick={()=>api.qualify(active.id,participant,d)}>{d}</button>)}</div></section>
        <section className="phoneActions"><button onClick={()=>setPanel(panel==="remark"?null:"remark")}>Remarque</button><button onClick={()=>setPanel(panel==="doc"?null:"doc")}>Document</button><button onClick={()=>api.sendParking(active.id, participant.name)}>Parking</button></section>
        {panel==="remark" && <section className="phoneInline"><textarea value={remark} onChange={e=>setRemark(e.target.value)} placeholder="Remarque courte..." /><button onClick={async()=>{ if(remark.trim()){ await api.addRemark(active.id, participant.name, remark.trim()); setRemark(""); setPanel(null); }}}>Envoyer</button></section>}
        {panel==="doc" && <section className="phoneInline"><input value={newDoc} onChange={e=>setNewDoc(e.target.value)} placeholder="Nom du document à proposer" /><button onClick={async()=>{ if(newDoc.trim()){ await api.proposeDocument(participant.name, newDoc.trim()); setNewDoc(""); setPanel(null); }}}>Proposer</button></section>}
      </main>
      <footer>Connecté : <b>{participant.name}</b></footer>
    </section>
  );
}
