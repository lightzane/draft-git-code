import { Router } from 'express';
import { Logger } from '../../logger';
import { LogEndpoints } from '../../utils';
import { ParentsController } from './parents.controller';

export class ParentsRoute {
  router = Router();
  private logger = Logger('ParentsRoute');

  constructor() {
    this.router.get('/', ParentsController.getParentRecords);
    this.router.get('/:slug', ParentsController.getParent);
    this.router.get('/:slug/children', ParentsController.getChildren);
    this.router.patch('/:slug/github/:input', ParentsController.editGithub);
    this.router.post('/add', ParentsController.addParent);
    this.router.delete('/remove', ParentsController.removeParents);

    LogEndpoints(module, this.logger, this.router.stack);
  }
}
