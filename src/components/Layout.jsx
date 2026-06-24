import { Home, MonitorUp, Smartphone, FileText, Download, Settings, Library, Boxes } from "lucide-react";
import { projectStats } from "../utils/stats";

const items = [
  ["dashboard", "Tableau de bord", Home],
  ["atelier", "Atelier documentaire", Boxes],
  ["projection", "Projection atelier", MonitorUp],
  ["participant", "Vue téléphone", Smartphone],
  ["referentiel", "Référentiel", FileText],
  ["exports", "Exports", Download],
  ["admin", "Administration", Settings],
  ["help", "Fiches réflexes", Library]
];

export default function Layout({ page, setPage, state, children }) {
  const stats = projectStats(state);
  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandLogo">ASE</div>
          <div><h1>Dossier Vert</h1><p>Ateliers documentaires ASE</p></div>
        </div>
        <nav>
          {items.map(([id,label,Icon]) => (
            <button key={id} className={page===id ? "active" : ""} onClick={() => setPage(id)}>
              <Icon size={18}/>{label}
            </button>
          ))}
        </nav>
        <div className="sidePanel">
          <span>Atelier</span><b>{state.meta.code}</b><small>{stats.participants} participant(s)</small>
        </div>
      </aside>
      <main className="mainArea">
        <header className="appHeader">
          <div><span className="eyebrow">Plateforme professionnelle des ateliers post-COPIL</span><h2>{state.meta.title}</h2><p>{state.meta.subtitle}</p></div>
          <div className="headerKpis">
            <div><b>{stats.documents}</b><span>Documents</span></div>
            <div><b>{stats.progress}%</b><span>Avancement</span></div>
            <div><b>{stats.suggestions}</b><span>Propositions</span></div>
            <div><b>{stats.parking}</b><span>Parking</span></div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
