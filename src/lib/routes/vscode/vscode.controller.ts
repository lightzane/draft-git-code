import { Logger } from '../../logger';
import { handleRequest } from '../../utils';
import { VSCodeService } from './vscode.service';

const logger = Logger('VSCodeController`');
const service = new VSCodeService();

export const VSCodeController = {
  open: handleRequest(logger, async (req, res) => {
    const { parentSlug, repo } = req.params;

    try {
      await service.open(parentSlug, repo);
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(422).json({ message: err.message }); // HTTP 422 unprocessable
      }

      // Err is string and expected message
      else if (typeof err === 'string' && err.includes('Path does not exist')) {
        res.status(422).json({ message: err });
      }

      // Other error
      else {
        res.status(500).json({
          message: 'Something went wrong',
        });
        logger.error(err);
      }
    }
  }),
};
