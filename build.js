// Сборка сайта: node build.js → папка dist/. Без зависимостей.
import { mkdirSync, writeFileSync, cpSync, rmSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/config.js';
import { allPages } from './src/pages.js';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(root, 'src/assets'), join(out, 'assets'), {
  recursive: true,
  filter: (src) => !src.endsWith('.png') || !src.includes('/cases/'), // в dist идут только webp-версии скриншотов
});
cpSync(join(root, 'src/static'), out, { recursive: true });

const pages = allPages();
for (const p of pages) {
  const file = p.path.endsWith('.html') ? join(out, p.path) : join(out, p.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, p.html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter(p => !p.noindex && !p.path.startsWith('/privacy'));
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(p => `  <url><loc>${site.url}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === '/' ? '1.0' : p.path.split('/').length > 3 ? '0.7' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`);

writeFileSync(join(out, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /404.html

Sitemap: ${site.url}/sitemap.xml
`);

writeFileSync(join(out, 'CNAME'), site.domain + '\n');
writeFileSync(join(out, '.nojekyll'), '');

console.log(`✓ ${pages.length} страниц → dist/`);
