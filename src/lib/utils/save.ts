import fs from 'fs';
import path from 'path';
import { Logger } from '../logger';

const logger = Logger('utils.save');

/** Write file and save it. (Formats JSON) */
export const save = (filepath: string, data: string, serverLog?: boolean) => {
  if (!fs.existsSync(filepath)) {
    if (serverLog) {
      const message = `Invalid path: ${filepath}`;
      logger.error(message);
      throw new Error(message);
    } else {
      console.error('Invalid path', filepath);
      process.exit();
    }
  }

  let isJSON = /\.json$/i.test(path.extname(filepath));

  if (isJSON) {
    try {
      data = JSON.parse(data);
      data = JSON.stringify(data, null, 2);
    } catch {
      isJSON = false;
    }
  }

  fs.writeFileSync(filepath, data, { encoding: 'utf-8' });
};
