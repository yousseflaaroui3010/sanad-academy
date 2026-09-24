import { gql } from './rw.mjs';
const P = { CPU_USAGE: 0.000463, MEMORY_USAGE_GB: 0.000231, DISK_USAGE_GB: 0.000003472222222, NETWORK_TX_GB: 0.05, BACKUP_USAGE_GB: 0.000003472222222 };
const M = Object.keys(P);
const projects = { 'sanad (Meriem, 6 sept)': '21784a73-aef2-47cf-89ce-aab060fdb0b2', 'sanad (Youssef, 15 sept)': 'd655517a-fca8-47f9-9f8c-5638c31641c4', 'sanad-academy': '1b3a6410-ba89-423d-af7d-ab2417402e68' };
const names = {};
for (const [label, id] of Object.entries(projects)) {
  const d = await gql(`query($p:String!,$m:[MetricMeasurement!]!,$s:DateTime!,$e:DateTime!){ project(id:$p){ services{edges{node{id name}}} } usage(projectId:$p, measurements:$m, startDate:$s, endDate:$e, groupBy:[SERVICE_ID], includeDeleted:true){ measurement value tags{serviceId} } estimatedUsage(projectId:$p, measurements:$m){ measurement estimatedValue } }`, { p: id, m: M, s: '2026-07-01T00:00:00Z', e: new Date().toISOString() });
  d.project.services.edges.forEach(({ node }) => names[node.id] = node.name);
  const per = {};
  for (const u of d.usage) { const n = names[u.tags.serviceId] || 'deleted:' + u.tags.serviceId.slice(0, 6); per[n] ??= {}; per[n][u.measurement] = (per[n][u.measurement] || 0) + u.value; }
  let total = 0; console.log(`\n== ${label}`);
  for (const [svc, m] of Object.entries(per)) {
    const cost = Object.entries(m).reduce((s, [k, v]) => s + v * P[k], 0); total += cost;
    console.log(`  ${svc.padEnd(16)} cpu ${(m.CPU_USAGE||0).toFixed(0)} vCPU-min | ram ${((m.MEMORY_USAGE_GB||0)/60).toFixed(0)} GB-h | disk ${((m.DISK_USAGE_GB||0)/60/24).toFixed(1)} GB-day | egress ${(m.NETWORK_TX_GB||0).toFixed(3)} GB | $${cost.toFixed(2)}`);
  }
  const est = d.estimatedUsage.reduce((s, e) => s + e.estimatedValue * P[e.measurement], 0);
  console.log(`  TOTAL so far: $${total.toFixed(2)}   | Railway estimate for current month: $${est.toFixed(2)}`);
}
const ws = await gql(`{ me { workspaces { name plan customer { currentUsage billingPeriod { start end } creditBalance } } } }`);
console.log('\n', JSON.stringify(ws.me.workspaces));
