import { Parent, ParentRecords } from '../../@types/git-code-config';
import { CONTEXT } from '../context';
import { Logger } from '../logger';
import { fetchConfig } from './fetch-config';

const logger = Logger('utils.fetch-parents');

/**
 * Retrieve parents or parent from the context in `gcode.config.json`.
 * @returns `null` if object has no keys
 */
export function fetchParents(): ParentRecords;
export function fetchParents(parentSlug: string): Parent;
export function fetchParents(
  parentSlug?: string,
): Parent | ParentRecords | null {
  const data = fetchConfig();

  if (data) {
    CONTEXT.config = data;
  }

  logger.debug('Checking data...');

  const parents = CONTEXT.config?.parents;

  if (parentSlug) {
    logger.debug(`with parentSlug: ${parentSlug}`);
  }

  if (!parents || !Object.keys(parents).length) {
    return null;
  }

  if (!parentSlug) {
    logger.debug(`Parent records found...`);
    logger.debug(Object.keys(parents));
    return parents;
  }

  const parentRecord = Object.entries(parents).find(
    ([_, value]) => value.slug === parentSlug,
  );

  if (!parentRecord?.length) {
    logger.debug('No data found');
    return null;
  }

  const parent = parentRecord[1];

  logger.debug(`Parent record found...`, {
    customObj: parent, // see logger.ts #myFormat AND defaultMeta
  });

  return parent;
}
