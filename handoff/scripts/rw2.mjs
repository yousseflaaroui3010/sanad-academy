import { gql } from './rw.mjs';
const e = await gql(`{ m: __type(name:"MetricMeasurement"){ enumValues{name} } w: __type(name:"Workspace"){ fields{name} } c: __type(name:"Customer"){ fields{name} } u: __type(name:"AggregatedUsage"){ fields{name} } me { workspaces { id name plan customer { id } } } }`);
console.log('measurements:', e.m.enumValues.map(x => x.name).join(' '));
console.log('workspace fields:', e.w.fields.map(x => x.name).join(' '));
console.log('customer fields:', e.c?.fields.map(x => x.name).join(' '));
console.log('aggUsage:', e.u?.fields.map(x => x.name).join(' '));
console.log(JSON.stringify(e.me.workspaces));
