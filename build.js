import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

// Clear existing dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

function copyRecursiveSync(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursiveSync(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy files
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(distDir, 'index.html'));

if (fs.existsSync(path.join(__dirname, 'css'))) {
  copyRecursiveSync(path.join(__dirname, 'css'), path.join(distDir, 'css'));
}

if (fs.existsSync(path.join(__dirname, 'js'))) {
  copyRecursiveSync(path.join(__dirname, 'js'), path.join(distDir, 'js'));
}

if (fs.existsSync(path.join(__dirname, 'public'))) {
  copyRecursiveSync(path.join(__dirname, 'public'), path.join(distDir, 'public'));
}

console.log('✓ Pure HTML/CSS/JS build complete in dist/');
