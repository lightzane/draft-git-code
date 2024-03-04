import { Router } from 'express';
import { Logger } from '../../logger';
import { VSCodeController } from './vscode.controller';
import { LogEndpoints } from '../../utils';

export class VSCodeRoute {
  router = Router();
  private logger = Logger('VSCodeRoute');

  constructor() {
    this.router.get('/:parentSlug/:repo', VSCodeController.open);
    LogEndpoints(module, this.logger, this.router.stack);
  }
}
