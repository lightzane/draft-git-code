import fs from 'fs/promises';
import path from 'path';

(async () => {
  const outDirs = ['lib', 'bin'];
  for (const outDir of outDirs) {
    fs.rm(path.join(process.cwd(), outDir), {
      force: true,
      recursive: true,
    });
  }
})();
