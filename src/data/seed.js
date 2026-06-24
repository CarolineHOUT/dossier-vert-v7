export const decisions = ["Obligatoire", "Conditionnel", "Exclu", "À expertiser"];
export const authorityOptions = ["Acte usuel", "Acte non usuel", "À expertiser"];

export const atelierList = [
  ["atelier-1", "Atelier 1 — Cartographie documentaire", "Cartographie documentaire ASE"],
  ["atelier-2", "Atelier 2 — Durées de conservation", "Tableau de gestion documentaire"],
  ["atelier-3", "Atelier 3 — Répartition par dossier", "Matrice documentaire"],
  ["atelier-4", "Atelier 4 — Consultabilité des pièces", "Grille de consultabilité"],
  ["atelier-5", "Atelier 5 — Règles d’élimination", "Référentiel d’élimination"],
  ["atelier-6", "Atelier 6 — Workflow documentaire cible", "Workflow documentaire ASE"]
];

export const initialDocuments = {
  "doc-001": { id:"doc-001", nom:"Information préoccupante", famille:"Protection enfance", etape:"Entrée dans le dispositif", sensibilite:"Confidentiel", authority:"À expertiser", status:"", conservation:"À qualifier", consultabilite:"À qualifier", baseLegale:"Protection de l’enfance / danger ou risque de danger", votes:{}, remarks:{} },
  "doc-002": { id:"doc-002", nom:"Rapport d’évaluation", famille:"Protection enfance", etape:"Évaluation", sensibilite:"Confidentiel", authority:"À expertiser", status:"", conservation:"À qualifier", consultabilite:"À qualifier", baseLegale:"Évaluation sociale et éducative", votes:{}, remarks:{} },
  "doc-003": { id:"doc-003", nom:"Jugement / ordonnance", famille:"Judiciaire", etape:"Décision", sensibilite:"Juridique", authority:"À expertiser", status:"", conservation:"Longue durée", consultabilite:"Restreinte", baseLegale:"Décision judiciaire relative à la mesure", votes:{}, remarks:{} },
  "doc-004": { id:"doc-004", nom:"Arrêté de prise en charge", famille:"Administratif", etape:"Décision", sensibilite:"Administrative", authority:"À expertiser", status:"", conservation:"Longue durée", consultabilite:"À qualifier", baseLegale:"Décision administrative de prise en charge", votes:{}, remarks:{} },
  "doc-005": { id:"doc-005", nom:"Projet pour l’enfant (PPE)", famille:"Projet enfant", etape:"Accueil / mesure", sensibilite:"Éducative", authority:"À expertiser", status:"", conservation:"À qualifier", consultabilite:"À qualifier", baseLegale:"Projet pour l’enfant", votes:{}, remarks:{} },
  "doc-006": { id:"doc-006", nom:"Autorisation sortie scolaire", famille:"Vie quotidienne", etape:"Suivi quotidien", sensibilite:"Faible", authority:"Acte usuel", status:"", conservation:"Durée utile", consultabilite:"À qualifier", baseLegale:"Acte de la vie quotidienne de l’enfant", votes:{}, remarks:{} },
  "doc-007": { id:"doc-007", nom:"Intervention médicale importante", famille:"Santé", etape:"Suivi santé", sensibilite:"Santé", authority:"Acte non usuel", status:"", conservation:"À qualifier", consultabilite:"Restreinte", baseLegale:"Accord autorité parentale à vérifier", votes:{}, remarks:{} },
  "doc-008": { id:"doc-008", nom:"Photos enfant", famille:"Identité / image", etape:"Accueil / mesure", sensibilite:"Donnée personnelle", authority:"Acte non usuel", status:"", conservation:"À limiter", consultabilite:"Restreinte", baseLegale:"Utilisation de l’image du mineur à justifier", votes:{}, remarks:{} }
};

export const defaultWorkshop = {
  meta: {
    code:"ASE-2026",
    title:"Dossier Vert — Ateliers documentaires ASE",
    subtitle:"Plateforme professionnelle des ateliers post-COPIL",
    activeWorkshopId:"atelier-1",
    activeDocumentId:"doc-001",
    publicUrl:"",
    createdAt:""
  },
  documents: initialDocuments,
  participants:{},
  activity:{},
  suggestions:{},
  parking:{},
  deliverables:{}
};
