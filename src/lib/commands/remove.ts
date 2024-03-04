import path from 'path';
import { CONTEXT } from '../context';
import { save, validatePath } from '../utils';

const remove = (inputPath: string) => {
  const validPath = validatePath(inputPath);

  if (!CONTEXT.config || !CONTEXT.packageDir) {
    console.error('Config is corrupted');
    process.exit(1);
  }

  const parents = CONTEXT.config.parents;

  const parentRecord = Object.entries(parents).find(
    ([_, value]) => value.path === validPath,
  );

  if (!parentRecord?.length) {
    console.log('The path is not part of the list...');
    process.exit();
  }

  delete parents[parentRecord[0]];

  console.log('Path removed!');

  const { packageDir, configName, config } = CONTEXT;

  save(path.join(packageDir, configName), JSON.stringify(config));
};

export default remove;
