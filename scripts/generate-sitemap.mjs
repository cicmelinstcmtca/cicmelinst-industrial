import { writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = 'https://cicmelinst.com';

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  const outputPath = resolve('dist', 'sitemap.xml');
  writeFileSync(outputPath, sitemap);
  console.log(`✅ Sitemap generado en ${outputPath}`);
}

generateSitemap();
