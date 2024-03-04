import fs from 'fs';
import { Logger } from '../logger';

const logger = Logger('utils.validatePath');

export const validatePath = (dirpath: string, serverLog?: boolean) => {
  if (!dirpath) {
    const message = `Please provide a directory path`;

    if (serverLog) {
      logger.warn(message);
      throw new Error(message);
    } else {
      console.warn(message);
      process.exit(1);
    }
  }

  // Current working directory
  if (dirpath === '.' && !serverLog) {
    return process.cwd();
  } else if (serverLog && /^\./.test(dirpath)) {
    logger.error(`Invalid path: "${dirpath}"`);
    throw new Error('Invalid path');
  }

  // Check if path exists
  if (!fs.existsSync(dirpath)) {
    const message = `Invalid path: ${dirpath}`;

    if (serverLog) {
      logger.error(message);
      throw new Error(message);
    } else {
      console.error(message);
      process.exit(1);
    }
  }

  // Check if path is a directory
  try {
    fs.readdirSync(dirpath, { withFileTypes: true });
  } catch (err) {
    let errMessage = `${dirpath} is not a directory.`;

    if (err instanceof Error) {
      errMessage = err.message || errMessage;
    }

    if (serverLog) {
      logger.error(errMessage);
      throw new Error(errMessage);
    } else {
      console.error(errMessage.red);
      process.exit(1);
    }
  }

  // Valid path
  return dirpath;
};
