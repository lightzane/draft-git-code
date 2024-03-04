import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { Logger } from '../../logger';
import { fetchParents } from '../../utils';

const logger = Logger('VSCodeService');

export class VSCodeService {
  /**
   * Opens the specified path in Microsoft Visual Studio Code (vscode).
   *
   * @param parentSlug Will be used as a reference for the Parent which holds the dir path
   * @param repo The repository or sub-folder under the parent directory
   */
  async open(parentSlug: string, repo: string) {
    return new Promise((resolve, reject) => {
      logger.debug(`Attempting to open repository: ${repo}...`);

      const parent = fetchParents(parentSlug);

      if (!parent) {
        const message = 'Parent Directory does not EXIST';
        logger.error(message);
        reject(message);
      }

      const fullpath = path.join(parent.path, repo);
      const isExist = fs.existsSync(fullpath);

      if (!isExist) {
        const message = `Path does not exist: ${fullpath}`;
        logger.error(message);
        reject(message);
        return;
      }

      logger.info('Opening in vscode...');
      logger.warn(`code "${fullpath}"`);

      exec(`code "${fullpath}"`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else if (stderr) {
          reject(stderr);
        }

        if (error || stderr) {
          return;
        }

        resolve(stdout);
      });
    });
  }
}
