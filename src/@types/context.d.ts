import { GitCodeConfig } from './git-code-config';

export type Context = {
  /** The default port number for the app server */
  port: number;

  /** The JSON data of the config */
  config?: GitCodeConfig;

  /** The name of the config */
  configName: string;

  /** The root directory path of this package */
  packageDir?: string;
};
