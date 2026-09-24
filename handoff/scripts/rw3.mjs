import { gql } from './rw.mjs';
const M = ['CPU_USAGE','MEMORY_USAGE_GB','NETWORK_TX_GB','DISK_USAGE_GB','BACKUP_USAGE_GB'];
const mine = await gql(`{ projects(workspaceId:"6771720e-3d44-48f8-bfc2-c8cdba33077f"){ edges{ node{ id name createdAt services{edges{node{name}}} volumes{edges{node{name volumeInstances{edges{node{currentSizeMB}}}}}} } } } }`);
const other = mine.projects.edges.map(e => e.node).filter(p => /sanad/i.test(p.name));
console.log('MYBL sanad projects:', JSON.stringify(other));
const ids = [['meriem sanad', '21784a73-aef2-47cf-89ce-aab060fdb0b2'], ...other.map(p => [p.name + ' (MYBL)', p.id])];
for (const [label, id] of ids) {
  try {
    const u = await gql(`query($p:String!,$m:[MetricMeasurement!]!,$s:DateTime!,$e:DateTime!){ usage(projectId:$p, measurements:$m, startDate:$s, endDate:$e, groupBy:[SERVICE_ID]){ measurement value tags { serviceId } } estimatedUsage(projectId:$p, measurements:$m){ measurement estimatedValue projectId } }`,
      { p: id, m: M, s: '2026-07-01T00:00:00Z', e: new Date().toISOString() });
    console.log('\n==', label, '\nusage:', JSON.stringify(u.usage), '\nestimated:', JSON.stringify(u.estimatedUsage));
  } catch (err) { console.log('\n==', label, 'ERR', err.message.slice(0, 300)); }
}
