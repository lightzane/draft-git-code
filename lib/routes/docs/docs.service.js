"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsService = void 0;
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const static_parent_1 = require("../../utils/static-parent");
const logger = (0, logger_1.Logger)('DocsService');
class DocsService {
    getStaticRouteUrl(parentSlug, repoName) {
        const parent = (0, utils_1.fetchParents)(parentSlug);
        logger.debug(`Retrieving parent information:`, {
            customObj: parent,
        });
        const docSite = new utils_1.DocSiteRecord(parent).generate().verify();
        const docSiteValue = docSite[repoName];
        if (!docSiteValue) {
            const message = `No entry point for ${repoName} found. Please create ~/docs/index.html`;
            logger.error(message);
            throw new Error(message);
        }
        let routeUrl = `/${static_parent_1.STATIC_HOME}/${parent.slug}/${repoName}`;
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
exports.DocsService = DocsService;
