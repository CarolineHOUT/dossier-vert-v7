import { asArray } from "../utils/stats";

export default function Referentiel({ state }) {
  const docs = asArray(state.documents);
  return (
    <section className="pageCard">
      <span className="eyebrow">Référentiel consolidé</span><h1>Référentiel documentaire ASE</h1>
      <div className="tableWrap"><table><thead><tr><th>Document</th><th>Famille</th><th>Étape</th><th>Autorité parentale</th><th>Qualification</th><th>Conservation</th><th>Consultabilité</th></tr></thead>
      <tbody>{docs.map(d => <tr key={d.id}><td><b>{d.nom}</b></td><td>{d.famille}</td><td>{d.etape}</td><td>{d.authority}</td><td>{d.status || "À traiter"}</td><td>{d.conservation}</td><td>{d.consultabilite}</td></tr>)}</tbody></table></div>
    </section>
  );
}
