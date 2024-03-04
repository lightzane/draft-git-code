import fs from 'fs';
import path from 'path';
import { DocSite, DocSiteValue, Parent } from '../../@types/git-code-config';
import { Logger } from '../logger';

const logger = Logger('DocSiteRecord');

export class DocSiteRecord {
  docSite?: DocSite;

  constructor(private readonly parent: Parent) {}
  /**
   * Generate a DocSite record with the repository names as keys while all values are `null`.
   *
   * To be used with `.verify(docSite)` to fill those null with actual values for data accuracy.
   */
  generate() {
    const parent = this.parent;
    this.docSite = {};

    logger.debug(`Generating "DocSite" from parent:`, {
      customObj: {
        parentId: parent.id,
        slug: parent.slug,
      },
    });

    const dirents = fs.readdirSync(parent.path, { withFileTypes: true });
    const folders = dirents.filter((d) => d.isDirectory());
    const docSite = folders
      .filter((d) => d.name.charAt(0) !== '_')
      .reduce((ds: DocSite, d) => {
        ds[d.name] = null;
        return ds;
      }, this.docSite);

    return this;
  }

  /**
   * Identifies that entry point of a static web application.
   *
   * This method verifies by filling all the `null` with an appropriate value:
   * `'docs' | 'site' | 'build' | 'index'`
   *
   * Mutates the `docSite` record.
   * To be chain with `new DocSiteRecord(parent).generate()` to create initial structure
   *
   */
  verify(): DocSite {
    const docSite = this.docSite;

    if (!docSite) {
      throw new Error(
        `Did you forgot to call new DocSiteRecord(parent).generate()?`,
      );
    }

    Object.keys(docSite).forEach((repoName) => {
      let value: DocSiteValue = null;

      const repoPath = path.join(this.parent.path, repoName);

      /** The folder that contains the entry point for the static web app */
      const checklist: DocSiteValue[] = ['docs', 'site', 'build'];

      for (const item of checklist) {
        if (!item) {
          continue;
        }

        if (fs.existsSync(path.join(repoPath, item, 'index.html'))) {
          value = item;
          break;
        }
      }

      // If non matched, then return the repoPath instead, verify "index.html" exists
      if (value === null && fs.existsSync(path.join(repoPath, 'index.html'))) {
        value = 'index';
      }

      docSite[repoName] = value;
    });

    logger.debug('Verified "DocSite":', {
      customObj: {
        docSite,
      },
    });

    return docSite;
  }
}
