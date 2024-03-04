export type GitCodeConfig = {
  /** The parent path to repositories */
  parents: ParentRecords;
};

/** The key is equal to the id */
export type ParentRecords = Record<string, Parent>;

/**
 *  The key is equal to the URL route (e.g. /docs)
 */
export type SiteRecords = Record<string, Parent>;

export type Parent = {
  id: string;
  path: string;
  slug: string;
  name: string;
  github: string | null;
};

/**
 * - K = is repository name
 * - V = `docs` / `site` (default: `docs`)
 */
export type DocSite = Record<string, DocSiteValue>;
export type DocSiteValue = 'index' | 'docs' | 'site' | 'build' | null;
