import { useState } from "react";
import Layout from "./components/Layout";
import { useCloudWorkshop } from "./store/useCloudWorkshop";
import Dashboard from "./pages/Dashboard";
import Atelier from "./pages/Atelier";
import Projection from "./pages/Projection";
import Participant from "./pages/Participant";
import Referentiel from "./pages/Referentiel";
import Exports from "./pages/Exports";
import Admin from "./pages/Admin";
import Help from "./pages/Help";

const pages = { dashboard:Dashboard, atelier:Atelier, projection:Projection, participant:Participant, referentiel:Referentiel, exports:Exports, admin:Admin, help:Help };

function initialPage() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");
  if (view === "participant") return "participant";
  if (view === "projection") return "projection";
  return "dashboard";
}

export default function App() {
  const { state, ready, api } = useCloudWorkshop();
  const [page, setPage] = useState(initialPage);

  if (!ready || !state) {
    return <div className="loading"><div>DV</div><h1>Chargement de Dossier Vert</h1><p>Connexion à l’atelier partagé Firebase...</p></div>;
  }

  const Page = pages[page] || Dashboard;

  if (page === "participant") return <Page state={state} api={api} setPage={setPage} />;

  return <Layout page={page} setPage={setPage} state={state}><Page state={state} api={api} setPage={setPage} /></Layout>;
}
