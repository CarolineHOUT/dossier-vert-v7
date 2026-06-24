import { atelierList } from "../data/seed";
import { asArray, projectStats } from "../utils/stats";
import QRCodePanel from "../components/QRCodePanel";

export default function Dashboard({ state, api, setPage }) {
  const stats = projectStats(state);
  const activity = asArray(state.activity).reverse().slice(0, 5);
  return (
    <div className="dashboardGrid">
      <section className="heroCard">
        <span className="eyebrow">Dossier Vert</span>
        <h1>Ateliers documentaires ASE</h1>
        <p>Une plateforme partagée pour construire le référentiel, capitaliser les remarques et produire les livrables.</p>
        <div className="progressLine"><span>Avancement global</span><b>{stats.progress}%</b><div><i style={{width:`${stats.progress}%`}} /></div></div>
        <button onClick={() => setPage("atelier")}>Entrer dans l’atelier</button>
      </section>
      <QRCodePanel state={state} api={api}/>
      <section className="wideCard">
        <div className="sectionTitle"><h2>Avancement des ateliers</h2><span>6 livrables attendus</span></div>
        <div className="workshopGrid">
          {atelierList.map(([id,title,deliverable], index) => (
            <article key={id} className={state.meta.activeWorkshopId===id ? "workshop active" : "workshop"}>
              <span>Atelier {index+1}</span><h3>{title.replace(`Atelier ${index+1} — `,"")}</h3><p>{deliverable}</p>
              <button onClick={() => api.setActiveWorkshop(id)}>Travailler cet atelier</button>
            </article>
          ))}
        </div>
      </section>
      <section className="activityCard">
        <h2>Activité récente</h2>
        {activity.map(a => <article key={a.id}><span>{a.at}</span><b>{a.text}</b>{a.detail && <p>{a.detail}</p>}</article>)}
        {!activity.length && <p>Aucune activité pour le moment.</p>}
      </section>
    </div>
  );
}
