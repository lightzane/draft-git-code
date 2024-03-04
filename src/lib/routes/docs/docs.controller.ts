import { Logger } from '../../logger';
import { handleErrorMessage, handleRequest } from '../../utils';
import { DocsService } from './docs.service';

const logger = Logger('DocsRoute');
const service = new DocsService();

export const DocsController = {
  getStaticPath: handleRequest(logger, (req, res) => {
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
    } catch (err) {
      const message = handleErrorMessage(err, { throw: false });
      logger.error(message);
      // HTTP 422 unprocessable
      res.status(422).json({ message });
    }
  }),
};
