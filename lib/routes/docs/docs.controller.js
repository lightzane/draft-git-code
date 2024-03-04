"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsController = void 0;
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const docs_service_1 = require("./docs.service");
const logger = (0, logger_1.Logger)('DocsRoute');
const service = new docs_service_1.DocsService();
exports.DocsController = {
    getStaticPath: (0, utils_1.handleRequest)(logger, (req, res) => {
        const body = req.body;
        if (!body) {
            const message = 'Missing input (body) - requires: parentSlug, repoName';
            logger.error(message);
            res.status(400).json({
                message,
            });
        }
        const { parentSlug, repoName } = body;
        if (!parentSlug || !repoName) {
            const message = 'All input required: parentSlug, repoName';
            logger.error(message);
            res.status(400).json({
                message,
            });
        }
        try {
            logger.debug('Attempting to retrieve route URL...');
            const staticRouteUrl = service.getStaticRouteUrl(parentSlug, repoName);
            logger.debug(`Found available route URL:`, {
                customObj: {
                    routeUrl: staticRouteUrl,
                },
            });
            res.status(200).json({
                data: staticRouteUrl,
            });
        }
        catch (err) {
            const message = (0, utils_1.handleErrorMessage)(err, { throw: false });
            logger.error(message);
            res.status(422).json({ message });
        }
    }),
};
