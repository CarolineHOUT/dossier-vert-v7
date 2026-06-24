import * as XLSX from "xlsx";
import { asArray } from "../utils/stats";

export default function Exports({ state }) {
  function exportExcel() {
    const docs = asArray(state.documents).map(d => ({ Document:d.nom, Famille:d.famille, Etape:d.etape, "Autorité parentale":d.authority, Qualification:d.status, Conservation:d.conservation, Consultabilité:d.consultabilite, "Base / vigilance":d.baseLegale, Justification:d.justification }));
    const participants = asArray(state.participants).map(p => ({ Nom:p.name, Fonction:p.fonction, Role:p.role, Connexion:p.joinedAt }));
    const activity = asArray(state.activity).map(a => ({ Type:a.type, Texte:a.text, Detail:a.detail, Date:a.at }));
    const suggestions = asArray(state.suggestions).map(s => ({ Document:s.title, Auteur:s.author, Statut:s.status, Date:s.at }));
    const parking = asArray(state.parking).map(p => ({ Document:p.documentId, Auteur:p.author, Sujet:p.reason, Date:p.at }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(docs), "Référentiel");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(participants), "Participants");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(activity), "Activité");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(suggestions), "Documents proposés");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(parking), "Parking");
    XLSX.writeFile(wb, "dossier-vert-export.xlsx");
  }
  return <section className="pageCard"><span className="eyebrow">Production des livrables</span><h1>Exports atelier</h1><p>Générez un fichier Excel multi-onglets exploitable après l’atelier.</p><button className="primary" onClick={exportExcel}>Exporter Excel</button></section>;
}
