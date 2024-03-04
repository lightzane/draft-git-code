import { exec } from 'child_process';
import { startServer } from '../app';
import { CONTEXT } from '../context';
import { Logger } from '../logger';

const logger = Logger('Serve');

const serve = async (port?: number) => {
  if (!process.env.NO_BROWSER) {
    openBrowser(port);
  }

  startServer(port);
};

function openBrowser(port = CONTEXT.port) {
  const url = new URL(`http://localhost:${port}`).href;
  const platform = process.platform;

  logger.info('Opening browser');

  switch (platform) {
    case 'win32':
      exec(`start ${url}`);
      break;
    case 'darwin':
      exec(`open ${url}`);
      break;
    case 'linux':
      exec(`xdg-open ${url}`);
      break;
    default:
      break;
  }
}

export default serve;
