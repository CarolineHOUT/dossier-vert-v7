import { useEffect, useMemo, useState } from "react";
import { onValue, ref, set, update, push } from "firebase/database";
import { db } from "../services/firebase";
import { defaultWorkshop } from "../data/seed";

const WORKSHOP_ID = "ASE-2026";
const workshopRef = ref(db, `workshops/${WORKSHOP_ID}`);

function now() {
  return new Date().toLocaleString("fr-FR");
}

function clean(value) {
  return JSON.parse(JSON.stringify(value));
}

export function useCloudWorkshop() {
  const [state, setState] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onValue(workshopRef, async snap => {
      if (!snap.exists()) {
        const seed = clean(defaultWorkshop);
        seed.meta.createdAt = now();
        await set(workshopRef, seed);
        return;
      }
      setState(snap.val());
      setReady(true);
    });
    return () => unsub();
  }, []);

  const api = useMemo(() => {
    async function addActivity(type, text, detail = "") {
      const a = push(ref(db, `workshops/${WORKSHOP_ID}/activity`));
      await set(a, { id:a.key, type, text, detail, at:now() });
    }

    return {
      addActivity,
      async setActiveDocument(id) {
        await update(ref(db, `workshops/${WORKSHOP_ID}/meta`), { activeDocumentId:id });
      },
      async setActiveWorkshop(id) {
        await update(ref(db, `workshops/${WORKSHOP_ID}/meta`), { activeWorkshopId:id });
      },
      async joinParticipant(participant) {
        await set(ref(db, `workshops/${WORKSHOP_ID}/participants/${participant.id}`), participant);
        await addActivity("connexion", `${participant.name} a rejoint l’atelier`, participant.fonction || "");
      },
      async setAuthority(documentId, value, author) {
        await update(ref(db, `workshops/${WORKSHOP_ID}/documents/${documentId}`), {
          authority:value, authorityUpdatedBy:author, authorityUpdatedAt:now()
        });
        await addActivity("autorite", `${author} propose : ${value}`);
      },
      async qualify(documentId, participant, value) {
        await set(ref(db, `workshops/${WORKSHOP_ID}/documents/${documentId}/votes/${participant.id}`), {
          participantId:participant.id, name:participant.name, value, at:now()
        });
        await addActivity("qualification", `${participant.name} propose : ${value}`);
      },
      async addRemark(documentId, author, text) {
        const r = push(ref(db, `workshops/${WORKSHOP_ID}/documents/${documentId}/remarks`));
        await set(r, { id:r.key, author, text, at:now() });
        await addActivity("remarque", `${author} ajoute une remarque`, text);
      },
      async proposeDocument(author, title) {
        const docRef = push(ref(db, `workshops/${WORKSHOP_ID}/documents`));
        const suggestionRef = push(ref(db, `workshops/${WORKSHOP_ID}/suggestions`));
        const doc = {
          id:docRef.key, nom:title, famille:"À qualifier", etape:"À qualifier", sensibilite:"À qualifier",
          authority:"À expertiser", status:"", conservation:"À qualifier", consultabilite:"À qualifier",
          baseLegale:"À qualifier", votes:{}, remarks:{}
        };
        await set(docRef, doc);
        await set(suggestionRef, { id:suggestionRef.key, title, author, type:"Document proposé", status:"À examiner", at:now() });
        await addActivity("document", `${author} propose un document`, title);
      },
      async sendParking(documentId, author, reason = "Sujet à approfondir") {
        const p = push(ref(db, `workshops/${WORKSHOP_ID}/parking`));
        await set(p, { id:p.key, documentId, author, reason, at:now() });
        await addActivity("parking", `${author} envoie un sujet au parking`, reason);
      },
      async retainDocument(documentId, status, justification = "") {
        await update(ref(db, `workshops/${WORKSHOP_ID}/documents/${documentId}`), {
          status, justification, decidedAt:now()
        });
        await addActivity("proposition", `Qualification retenue : ${status}`);
      },
      async updatePublicUrl(url) {
        await update(ref(db, `workshops/${WORKSHOP_ID}/meta`), { publicUrl:url });
      },
      async resetWorkshop() {
        const seed = clean(defaultWorkshop);
        seed.meta.createdAt = now();
        await set(workshopRef, seed);
      }
    };
  }, []);

  return { state, ready, api, workshopId:WORKSHOP_ID };
}
