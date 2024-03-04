import fs from 'fs';
import path from 'path';
import { GitCodeConfig } from '../../@types/git-code-config';
import { CONTEXT } from '../context';

/**
 * Fetch core data for this app. The data will be pulled from the `gcode.config.json`.
 */
export const fetchConfig = () => {
  const { packageDir, configName } = CONTEXT;

  if (!packageDir) {
    return null;
  }

  const configPath = path.join(packageDir, configName);

  const configRaw = fs.readFileSync(configPath, {
    encoding: 'utf-8',
  });

  return JSON.parse(configRaw) as GitCodeConfig;
};
