export default function Admin({ api }) {
  return (
    <section className="pageCard">
      <span className="eyebrow">Administration</span><h1>Paramètres atelier</h1>
      <div className="adminGrid">
        <div><h3>Import Excel</h3><p>Import guidé prévu en V7.1.</p><input type="file" accept=".xlsx,.xls" onChange={() => alert("Import guidé prévu en V7.1")} /></div>
        <div><h3>Réinitialisation</h3><p>Réinitialise l’atelier partagé dans Firebase.</p><button onClick={api.resetWorkshop}>Réinitialiser l’atelier</button></div>
      </div>
    </section>
  );
}
