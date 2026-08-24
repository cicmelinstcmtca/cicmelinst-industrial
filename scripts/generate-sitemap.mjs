import { writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = 'https://cicmelinst.com';
const PAGES = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: '#capabilities', priority: 0.8, changefreq: 'monthly' },
  { path: '#projects', priority: 0.8, changefreq: 'weekly' },
  { path: '#fleet', priority: 0.8, changefreq: 'monthly' },
  { path: '#team', priority: 0.6, changefreq: 'monthly' },
  { path: '#contact', priority: 0.9, changefreq: 'monthly' },
  { path: '#clients', priority: 0.6, changefreq: 'monthly' },
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const urls = PAGES.map(page => `
  <url>
    <loc>${BASE_URL}/${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  const outputPath = resolve('dist', 'sitemap.xml');
  writeFileSync(outputPath, sitemap);
  console.log(`✅ Sitemap generado en ${outputPath}`);
}

generateSitemap();