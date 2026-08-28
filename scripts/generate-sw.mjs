import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const distDir = resolve('dist');
const swSrc = resolve('public/sw.js');
const swDest = resolve(distDir, 'sw.js');

if (!existsSync(swSrc)) {
  console.error('SW source not found:', swSrc);
  process.exit(1);
}

const template = readFileSync(swSrc, 'utf-8');
const timestamp = Date.now();
const version = `v${timestamp}`;

const generated = template
  .replace(/const SW_VERSION = '.*?'/, `const SW_VERSION = '${version}'`)
  .replace(/const BUILD_ID = '.*?'/, `const BUILD_ID = '${new Date().toISOString()}'`);

writeFileSync(swDest, generated);
console.log(`✅ SW generado: ${swDest} (${version})`);