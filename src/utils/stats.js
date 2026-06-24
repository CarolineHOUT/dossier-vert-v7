import { decisions } from "../data/seed";

export function asArray(obj) {
  return obj ? Object.values(obj) : [];
}

export function voteCounts(doc) {
  const votes = Object.values(doc?.votes || {});
  const counts = {};
  decisions.forEach(d => counts[d] = 0);
  votes.forEach(v => {
    if (counts[v.value] !== undefined) counts[v.value] += 1;
  });
  return counts;
}

export function majority(doc) {
  const counts = voteCounts(doc);
  const entries = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  if (!entries[0] || entries[0][1] === 0) return "En cours";
  return entries[0][0];
}

export function consensus(doc) {
  const counts = voteCounts(doc);
  const values = Object.values(counts);
  const total = values.reduce((a,b)=>a+b,0);
  if (!total) return 0;
  return Math.round(Math.max(...values) / total * 100);
}

export function projectStats(state) {
  const docs = asArray(state.documents);
  const worked = docs.filter(d => d.status || Object.keys(d.votes || {}).length > 0).length;
  return {
    documents: docs.length,
    worked,
    progress: docs.length ? Math.round(worked / docs.length * 100) : 0,
    participants: asArray(state.participants).length,
    suggestions: asArray(state.suggestions).length,
    parking: asArray(state.parking).length,
    activity: asArray(state.activity).length
  };
}
