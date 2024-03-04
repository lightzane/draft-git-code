import path from 'path';

import {
  DocSite,
  Parent,
  ParentRecords,
} from '../../../@types/git-code-config';
import add from '../../commands/add';
import { CONTEXT } from '../../context';
import { Logger } from '../../logger';
import {
  DocSiteRecord,
  fetchConfig,
  fetchParents,
  handleErrorMessage,
  save,
} from '../../utils';

const logger = Logger('ParentsService');

export class ParentsService {
  /** Checks available data and list sub-folders from a given parent folder. Excludes folder which names starts with `_` */
  private fetchChildren(parentId: string): DocSite | null {
    const config = fetchConfig();

    if (!config) {
      return null;
    }

    const parent = config.parents[parentId];

    if (!parent) {
      return null;
    }

    return new DocSiteRecord(parent).generate().verify();
  }

  getParentRecords(): ParentRecords {
    logger.debug('Retrieving directories...');
    return fetchParents();
  }

  getParent(slug: string): Parent {
    logger.debug('Retrieving a directory...');
    return fetchParents(slug);
  }

  /** Excludes folders which names starts with `_` */
  getChildren(parentSlug: string): DocSite | null {
    const data = fetchParents(parentSlug);

    if (!data) {
      return null;
    }

    logger.debug('Retrieving repositories...');

    const docSites = this.fetchChildren(data.id) || {};
    const docSitesLen = Object.keys(docSites).length;
    const repositories = docSites && docSitesLen ? docSites : null;

    if (docSitesLen) {
      logger.debug('Found sub-folders list', {
        customObj: docSites,
      });
    }

    return repositories;
  }

  /** Update the GitHub value */
  editGithub(parentSlug: string, input: string) {
    logger.debug('Attempting to modify GitHub link...');
    const parent = fetchParents(parentSlug);

    if (!parent) {
      const message = 'Parent does not exist';
      logger.debug(message, {
        customObj: {
          parentSlug,
          input,
        },
      });
      throw new Error(message);
    }

    logger.info('Modifying GitHub link...');

    parent.github = input;

    const { packageDir, configName, config } = CONTEXT;

    if (!packageDir || !config?.parents) {
      return;
    }

    logger.debug(`Update parent: ${parent.id}`, {
      customObj: config.parents[parent.id],
    });

    try {
      save(path.join(packageDir, configName), JSON.stringify(config));
    } catch (err) {
      throw new Error(
        handleErrorMessage(err, {
          message: 'Unable to save',
        }),
      );
    }
  }

  addParent(inputPath: string) {
    try {
      return add(inputPath, { serverLog: true }) || null;
    } catch (err) {
      throw new Error(handleErrorMessage(err));
    }
  }

  removeParents(parentIds: string[]) {
    let parentRecords: ParentRecords;

    try {
      parentRecords = fetchParents();

      logger.debug('Current parent records:', {
        customObj: parentRecords,
      });
    } catch (err) {
      throw new Error(handleErrorMessage(err));
    }

    if (!parentRecords || !CONTEXT.config || !CONTEXT.packageDir) {
      return;
    }

    parentIds.forEach((id) => {
      delete parentRecords[id];
    });

    const { packageDir, configName, config } = CONTEXT;

    try {
      save(path.join(packageDir, configName), JSON.stringify(config));
    } catch (err) {
      throw new Error(handleErrorMessage(err));
    }

    logger.info(`Successfully removed directories...`);
    logger.debug(`Current parent records:`, {
      customObj: parentRecords,
    });

    return parentRecords;
  }
}
