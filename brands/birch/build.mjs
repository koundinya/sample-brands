import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));
const domain = process.env.BRAND_DOMAIN || process.env.RENDER_EXTERNAL_HOSTNAME;
if (!domain || !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain)) {
  throw new Error('Set BRAND_DOMAIN to a hostname for local builds. Render supplies RENDER_EXTERNAL_HOSTNAME automatically.');
}
const brandDomain = domain.toLowerCase();
const entry = {
  '@context': { osd: 'https://opensupport.directory/ns#' },
  identifier: 'urn:air:z3nbirch.zendesk.com:64e71deb-4796-4c46-b077-583820832d1b:support:mcp-server',
  displayName: 'Birch Customer Support',
  type: 'application/mcp-server-card+json',
  url: 'https://z3nbirch.zendesk.com/api/mcp/server-card',
  description: 'Customer support for Birch orders, including questions about damaged items, refund requests, delivery and account access.',
  representativeQueries: [
    'My Birch order arrived damaged. Where can I ask for a refund?',
    'Where can I get help with a Birch delivery?',
    'How can I contact Birch about my account?',
  ],
  'osd:brandName': 'Birch',
  'osd:brandDomain': brandDomain,
};
const poppyEntry = {
  ...entry,
  '@context': { osd: 'https://openservicedirectory.org/ns#' },
  identifier: `urn:air:${brandDomain}:support:poppy`,
  type: 'application/poppy+json',
  url: `https://${brandDomain}/.well-known/poppy.json`,
};
// Match the existing signed-out Zendesk integration. Do not advertise sign-in
// or a separate Poppy conversation endpoint that the service does not provide.
const poppy = {
  protocol_version: '1.0',
  organization: { name: 'Birch', domain: brandDomain },
  apis: [{
    type: 'mcp',
    url: 'https://z3nbirch.zendesk.com/api/mcp',
    description: entry.description,
  }],
};
const output = join(root, 'dist');
cpSync(join(root, 'public'), output, { recursive: true });
mkdirSync(join(output, '.well-known'), { recursive: true });
writeFileSync(join(output, '.well-known/ard.json'), JSON.stringify({ specVersion: '1.0', entries: [entry, poppyEntry] }, null, 2) + '\n');
console.log(`Built Birch website and ARD for https://${brandDomain}`);
writeFileSync(join(output, '.well-known/poppy.json'), JSON.stringify(poppy, null, 2) + '\n');
