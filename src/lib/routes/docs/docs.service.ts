import { Logger } from '../../logger';
import { DocSiteRecord, fetchParents } from '../../utils';
import { STATIC_HOME } from '../../utils/static-parent';

const logger = Logger('DocsService');

export class DocsService {
  /** Construct the path to the static asset to be used for `express.static()` */
  getStaticRouteUrl(parentSlug: string, repoName: string) {
    const parent = fetchParents(parentSlug);

    logger.debug(`Retrieving parent information:`, {
      customObj: parent,
    });

    const docSite = new DocSiteRecord(parent).generate().verify();

    /** The entry point for the static web app */
    const docSiteValue = docSite[repoName];

    if (!docSiteValue) {
      const message = `No entry point for ${repoName} found. Please create ~/docs/index.html`;
      logger.error(message);
      throw new Error(message);
    }

    let routeUrl = `/${STATIC_HOME}/${parent.slug}/${repoName}`;

    switch (docSiteValue) {
      case 'docs':
      case 'site':
      case 'build':
        return `${routeUrl}/${docSiteValue}`;
      case 'index':
      default:
        return routeUrl;
    }
  }
}
