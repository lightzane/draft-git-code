import { Router } from 'express';
import { DocsRoute } from './docs/docs.route';
import { ParentsRoute } from './parents/parents.route';
import { VSCodeRoute } from './vscode/vscode.route';

export class ApiRoute {
  router = Router();

  constructor() {
    this.router.use('/parents', new ParentsRoute().router);
    this.router.use('/vscode', new VSCodeRoute().router);
    this.router.use('/docs', new DocsRoute().router);
  }
}
