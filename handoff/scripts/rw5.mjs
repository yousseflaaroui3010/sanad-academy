import { gql } from './rw.mjs';
const pid = 'd655517a-fca8-47f9-9f8c-5638c31641c4';
const p = await gql(`{ project(id:"${pid}"){ services{edges{node{id name}}} environments{edges{node{id name}}} } }`);
const env = p.project.environments.edges[0].node.id;
for (const { node } of p.project.services.edges) {
  const d = await gql(`query($s:String!,$e:String!,$a:DateTime!){ metrics(serviceId:$s, environmentId:$e, startDate:$a, measurements:[MEMORY_USAGE_GB,CPU_USAGE], sampleRateSeconds:21600){ measurement values{ ts value } } }`, { s: node.id, e: env, a: '2026-09-15T00:00:00Z' });
  for (const m of d.metrics) console.log(node.name.padEnd(9), m.measurement.padEnd(16), m.values.map(v => new Date(v.ts * 1000).toISOString().slice(5, 13) + '=' + v.value.toFixed(2)).join(' '));
}
