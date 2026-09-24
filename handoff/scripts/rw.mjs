import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
const c = JSON.parse(readFileSync(homedir() + '/.railway/config.json', 'utf8'));
const t = c.user.token || c.user.accessToken;
export const gql = async (query, variables = {}) => {
  const r = await fetch('https://backboard.railway.com/graphql/v2', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + t }, body: JSON.stringify({ query, variables }) });
  const j = await r.json(); if (j.errors) throw new Error(JSON.stringify(j.errors).slice(0, 800)); return j.data;
};
if (process.argv[2] === 'intro') {
  const d = await gql(`{ q: __type(name:"Query"){ fields{ name args{name} } } }`);
  console.log(d.q.fields.filter(f => /usage|billing|invoice|customer|volume|metric|workspace|project/i.test(f.name)).map(f => f.name + '(' + f.args.map(a => a.name).join(',') + ')').join('\n'));
}
if (process.argv[2] === 'projects') {
  const d = await gql(`{ projects { edges { node { id name createdAt workspace { name } services { edges { node { id name createdAt } } } volumes { edges { node { id name createdAt volumeInstances { edges { node { currentSizeMB sizeMB mountPath state } } } } } } } } } }`);
  for (const { node: p } of d.projects.edges) if (/sanad/i.test(p.name)) console.log(JSON.stringify(p, null, 1));
}
