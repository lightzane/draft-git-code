import fs from 'fs';
import path from 'path';
import { GitCodeConfig } from '../../@types/git-code-config';
import { CONTEXT } from '../context';

/**
 * Setup `gcode.config.json`
 * @param packageDir root directory path of the package
 */
const init = (packageDir: string, clean = false) => {
  const encoding = 'utf-8';
  const template: GitCodeConfig = {
    parents: {},
  };

  const configPath = path.join(packageDir, CONTEXT.configName);

  if (!fs.existsSync(configPath) || clean) {
    fs.writeFileSync(configPath, JSON.stringify(template), { encoding });

    if (clean) {
      console.log(`Config initialized`);
      process.exit();
    }

    return;
  }

  if (clean) {
    console.log(`Config already exists.`);
  }

  // Validate existing config
  const jsonRaw = fs.readFileSync(configPath, { encoding });

  try {
    JSON.parse(jsonRaw);
  } catch {
    console.error('Config is corrupted');
    console.log('To clean up data, run: gcode clean');
    process.exit(1);
  }

  // validate content
  return;
};

export default init;
