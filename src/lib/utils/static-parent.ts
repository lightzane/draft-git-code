import express, { Express } from 'express';
import fs from 'fs';
import path from 'path';
import { fetchParents } from './fetch-parents';

export const STATIC_HOME = '_';

/**
 * Serve directories of existing parents as static assets
 */
export function staticParents(app: Express): void {
  const parents = fetchParents() || {};

  Object.entries(parents).forEach(([_, value]) => {
    if (fs.existsSync(value.path)) {
      app.use(
        `/${STATIC_HOME}/${value.slug}`,
        express.static(path.join(value.path)),
      );
    }
  });
}
