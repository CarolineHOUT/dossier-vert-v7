import { asArray, consensus, majority, projectStats, voteCounts } from "../utils/stats";
import { decisions } from "../data/seed";

export default function Projection({ state }) {
  const docs = asArray(state.documents);
  const active = state.documents[state.meta.activeDocumentId] || docs[0];
  const stats = projectStats(state);
  const counts = voteCounts(active);
  const activity = asArray(state.activity).reverse().slice(0, 6);
  const remarks = asArray(active.remarks).reverse().slice(0, 5);

  return (
    <section className="projectionStage">
      <header>
        <div><span>Dossier Vert</span><h1>Atelier documentaire ASE</h1></div>
        <div className="stageProgress"><b>{stats.worked}/{stats.documents}</b><span>documents travaillés</span><div><i style={{width:`${stats.progress}%`}} /></div></div>
      </header>
      <main>
        <section className="projectedDoc">
          <span>Document projeté</span><h2>{active.nom}</h2>
          <div><b>{active.famille}</b><b>{active.etape}</b><b>{active.authority}</b><b>{consensus(active)}% tendance</b></div>
        </section>
        <aside className="dominant"><span>Qualification proposée</span><b>{majority(active)}</b><small>{Object.values(counts).reduce((a,b)=>a+b,0)} contribution(s)</small></aside>
        <section className="bigVotes">
          {decisions.map(d => <article key={d}><span>{d}</span><b>{counts[d]}</b></article>)}
        </section>
        <section className="liveWall">
          <div><h3>Activité en direct</h3>{activity.map(a => <article key={a.id}><span>{a.at}</span><b>{a.text}</b>{a.detail && <p>{a.detail}</p>}</article>)}{!activity.length && <p>Les contributions apparaîtront ici.</p>}</div>
          <div><h3>Remarques document</h3>{remarks.map(r => <article key={r.id}><span>{r.at}</span><b>{r.author}</b><p>{r.text}</p></article>)}{!remarks.length && <p>Aucune remarque pour ce document.</p>}</div>
        </section>
      </main>
      <footer><span>Participants : <b>{stats.participants}</b></span><span>Documents proposés : <b>{stats.suggestions}</b></span><span>Parking : <b>{stats.parking}</b></span></footer>
    </section>
  );
}
