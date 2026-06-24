import { useState } from "react";
import { authorityOptions, decisions } from "../data/seed";
import { asArray, consensus, majority, voteCounts } from "../utils/stats";

export default function Atelier({ state, api }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [justification, setJustification] = useState("");
  const docs = asArray(state.documents);
  const active = state.documents[state.meta.activeDocumentId] || docs[0];
  const counts = voteCounts(active);

  const filteredDocs = docs.filter(d => {
    const match = d.nom.toLowerCase().includes(query.toLowerCase());
    if (!match) return false;
    if (filter === "Tous") return true;
    if (filter === "À traiter") return !d.status;
    return d.status === filter;
  });

  async function retain(status) {
    await api.retainDocument(active.id, status, justification);
    setJustification("");
  }

  return (
    <div className="atelierPro">
      <aside className="docRail">
        <div className="railHead"><h3>Documents</h3><b>{filteredDocs.length}</b></div>
        <input placeholder="Rechercher..." value={query} onChange={e=>setQuery(e.target.value)} />
        <div className="filters">
          {["Tous","À traiter","Obligatoire","Conditionnel","Exclu","À expertiser"].map(f => <button key={f} className={filter===f ? "active" : ""} onClick={()=>setFilter(f)}>{f}</button>)}
        </div>
        <div className="docList">
          {filteredDocs.map((d,index)=>(
            <button key={d.id} className={d.id===active.id ? "active" : ""} onClick={()=>api.setActiveDocument(d.id)}>
              <span>{index+1}</span><b>{d.nom}</b><small>{d.status || "À traiter"}</small>
            </button>
          ))}
        </div>
      </aside>
      <section className="workbench">
        <header className="docHeader">
          <span className="eyebrow">Document en discussion</span><h1>{active.nom}</h1>
          <div className="metaGrid">
            <div><span>Famille</span><b>{active.famille}</b></div><div><span>Étape</span><b>{active.etape}</b></div>
            <div><span>Sensibilité</span><b>{active.sensibilite}</b></div><div><span>Tendance</span><b>{majority(active)}</b></div>
          </div>
        </header>
        <div className="workGrid">
          <section className="panel">
            <div className="panelHead"><h2>Autorité parentale</h2><span>{active.authority}</span></div>
            <div className="choiceGrid">
              {authorityOptions.map(o => <button key={o} className={active.authority===o ? "active":""} onClick={()=>api.setAuthority(active.id,o,"Animateur")}>{o}</button>)}
            </div>
          </section>
          <section className="panel">
            <div className="panelHead"><h2>Qualification proposée</h2><span>{consensus(active)}% tendance</span></div>
            <div className="statusGrid">
              {decisions.map(d => <button key={d} onClick={()=>retain(d)}><span>{d}</span><b>{counts[d]}</b></button>)}
            </div>
          </section>
          <section className="panel help">
            <h2>Fiche réflexe</h2>
            <p><b>Acte usuel :</b> acte de la vie quotidienne de l’enfant, par exemple une sortie scolaire courante.</p>
            <p><b>Acte non usuel :</b> acte important nécessitant l’accord de l’autorité parentale.</p>
            <p><b>À expertiser :</b> avis métier, juridique, DPO ou archives nécessaire.</p>
          </section>
          <section className="panel">
            <h2>Formalisation</h2>
            <textarea value={justification} onChange={e=>setJustification(e.target.value)} placeholder="Justification ou synthèse de l’atelier..." />
            <div className="buttonRow">
              {decisions.map(d => <button key={d} onClick={()=>retain(d)}>{d}</button>)}
              <button onClick={()=>api.sendParking(active.id,"Animateur")}>Parking</button>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
