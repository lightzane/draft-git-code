import cors from 'cors';
import express from 'express';
import http from 'http';
import path from 'path';
import { CONTEXT } from './context';
import { Logger } from './logger';
import { ApiRoute } from './routes';
import { staticParents } from './utils/static-parent';

export const app = express();
export const server = http.createServer(app);

export const startServer = async (port = CONTEXT.port) => {
  const logger = Logger('App');

  app.use(cors());
  app.use(express.json());

  const GIT_CODE_UI_PATH = path.join(CONTEXT.packageDir!, 'public');

  app.use('/', express.static(GIT_CODE_UI_PATH));

  // * Plan is to make every parent folder a "static" (and opened via "docs/" or "site/" folders)
  // * see static-parents.ts
  // app.use(
  //   '/$STATIC_HOME/:parent',
  //   express.static('path/to/parent'),
  // );
  staticParents(app);

  app.use('/api', new ApiRoute().router);

  // * IMPORTANT * Fallback route for SPA
  app.get('*', (_, res) => {
    res.sendFile(path.join(GIT_CODE_UI_PATH, 'index.html'));
  });

  server.listen(port, () => {
    logger.info(`🚀 Server running at http://localhost:${port}`);
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    logger.verbose('Use SIGTERM instead of SIGINT on deployments.');
    logger.warn('Server interrupted...');
    logger.warn('Shutting down... please wait');
    logger.warn('Server closed. Thank you for using me! 🙂');

    process.exit(1); // force quit

    // server.close(() => { // can take several minutes for server to close
    //   process.exit();
    // });
  });
};
