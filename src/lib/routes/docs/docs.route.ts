import { Router } from 'express';
import { Logger } from '../../logger';
import { LogEndpoints } from '../../utils';
import { DocsController } from './docs.controller';

export class DocsRoute {
  router = Router();
  private logger = Logger('DocsRoute');

  constructor() {
    this.router.post('/', DocsController.getStaticPath);
    LogEndpoints(module, this.logger, this.router.stack);
  }
}

// const logger = Logger('DocsRoute');

// export const DocsRoute = router;

// router.post('/', DocsController.getStaticPath);

// LogEndpoints(module, logger, router.stack);
