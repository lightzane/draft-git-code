import path from 'path';
import { Parent } from '../../@types/git-code-config';
import { CONTEXT } from '../context';
import { Logger } from '../logger';
import { TextUtil, save, validatePath } from '../utils';

const logger = Logger('Commands.Add');

export interface AddOptions {
  serverLog?: boolean;
}

const add = (inputPath: string, options?: AddOptions) => {
  const validPath = validatePath(inputPath, options?.serverLog);

  logger.debug(`Validate Path:`, {
    customObj: {
      validPath,
    },
  });

  if (!CONTEXT.config || !CONTEXT.packageDir) {
    const message = 'Config is corrupted';

    if (options?.serverLog) {
      logger.error(message);
      throw new Error(message);
    } else {
      console.error(message);
      process.exit(1);
    }
  }

  const parents = CONTEXT.config.parents;

  const parentRecord = Object.entries(parents).find(
    ([_, value]) => value.path === inputPath,
  );

  if (parentRecord) {
    const message = 'Path already included.';

    if (options?.serverLog) {
      logger.warn(message);
      throw new Error(message);
    } else {
      console.warn(message);
      process.exit();
    }
  }

  const ts = Math.floor(Date.now() / 1000).toString();

  /** The name of the folder */
  const name = path.basename(validPath);
  const slug = TextUtil.slug(name);
  const id = slug === 'gcode' ? 'gcode' : ts;

  const newParent: Parent = {
    id,
    path: validPath,
    slug,
    name: TextUtil.pascal(name),
    github: slug,
  };

  CONTEXT.config.parents[id] = newParent;

  const { packageDir, configName, config } = CONTEXT;

  save(path.join(packageDir, configName), JSON.stringify(config));

  if (options?.serverLog) {
    logger.info(`Adding path: ${validPath}`);
    logger.debug(`Parent object added:`, {
      customObj: newParent,
    });
  } else {
    console.log('Path added!');
  }

  return newParent;
};

export default add;
