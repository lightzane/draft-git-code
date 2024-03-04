import { Logger } from '../../logger';
import { handleErrorMessage, handleRequest } from '../../utils';
import { ParentsService } from './parents.service';

const logger = Logger('ParentsController');
const service = new ParentsService();

export const ParentsController = {
  getParentRecords: handleRequest(logger, (_, res) => {
    res.json({
      data: service.getParentRecords(),
    });
  }),

  getParent: handleRequest(logger, (req, res) => {
    res.json({
      data: service.getParent(req.params.slug),
    });
  }),

  getChildren: handleRequest(logger, (req, res) => {
    res.json({
      data: service.getChildren(req.params.slug),
    });
  }),

  editGithub: handleRequest(logger, (req, res) => {
    const { slug, input } = req.params;

    try {
      service.editGithub(slug, input);
      res.json({ success: true });
    } catch (err) {
      // HTTP 422 unprocessable
      res
        .status(422)
        .json({ message: handleErrorMessage(err, { throw: false }) });
    }
  }),

  addParent: handleRequest(logger, (req, res) => {
    const input = req.body.path;

    logger.debug(`Body param received:`, {
      customObj: req.body,
    });

    if (!input) {
      logger.info('Attempting to add a parent directory...');
      logger.error('No data input (path) received');
      res.status(400).json({
        message: 'Input required',
      });
      return;
    }

    try {
      res.status(201).json({
        data: service.addParent(input),
      });
    } catch (err) {
      const message = handleErrorMessage(err, { throw: false });

      res.status(422).json({
        message,
      });

      logger.error(message);
    }
  }),

  removeParents: handleRequest(logger, (req, res) => {
    const pids = req.body.pids as string[];

    logger.debug(`Body param received:`, {
      customObj: req.body,
    });

    if (!pids || !pids.length) {
      logger.info('Attempting to remove parents');
      logger.error('No data input (pids) received');
      res.status(400).json({
        message: 'Input required',
      });
      return;
    }

    try {
      const parentRecords = service.removeParents(pids);
      res.status(200).json({
        data: parentRecords || null,
      });
    } catch (err) {
      const message = handleErrorMessage(err, { throw: false });
      res.status(500).json({
        message,
      });
    }
  }),
};
