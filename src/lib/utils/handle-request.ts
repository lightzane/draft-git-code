import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Logger } from 'winston';

/**
 * Extended `RequestHandler` for Express routes
 * which includes logging endpoints called.
 *
 * Log level: `'debug'`
 */
export function handleRequest(logger: Logger, handler: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`${req.method}`.yellow, {
      route: req.originalUrl.yellow,
    });

    handler(req, res, next);
  };
}
