"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentsService = void 0;
const path_1 = __importDefault(require("path"));
const add_1 = __importDefault(require("../../commands/add"));
const context_1 = require("../../context");
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const logger = (0, logger_1.Logger)('ParentsService');
class ParentsService {
    fetchChildren(parentId) {
        const config = (0, utils_1.fetchConfig)();
        if (!config) {
            return null;
        }
        const parent = config.parents[parentId];
        if (!parent) {
            return null;
        }
        return new utils_1.DocSiteRecord(parent).generate().verify();
    }
    getParentRecords() {
        logger.debug('Retrieving directories...');
        return (0, utils_1.fetchParents)();
    }
    getParent(slug) {
        logger.debug('Retrieving a directory...');
        return (0, utils_1.fetchParents)(slug);
    }
    getChildren(parentSlug) {
        const data = (0, utils_1.fetchParents)(parentSlug);
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
    editGithub(parentSlug, input) {
        logger.debug('Attempting to modify GitHub link...');
        const parent = (0, utils_1.fetchParents)(parentSlug);
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
        const { packageDir, configName, config } = context_1.CONTEXT;
        if (!packageDir || !(config === null || config === void 0 ? void 0 : config.parents)) {
            return;
        }
        logger.debug(`Update parent: ${parent.id}`, {
            customObj: config.parents[parent.id],
        });
        try {
            (0, utils_1.save)(path_1.default.join(packageDir, configName), JSON.stringify(config));
        }
        catch (err) {
            throw new Error((0, utils_1.handleErrorMessage)(err, {
                message: 'Unable to save',
            }));
        }
    }
    addParent(inputPath) {
        try {
            return (0, add_1.default)(inputPath, { serverLog: true }) || null;
        }
        catch (err) {
            throw new Error((0, utils_1.handleErrorMessage)(err));
        }
    }
    removeParents(parentIds) {
        let parentRecords;
        try {
            parentRecords = (0, utils_1.fetchParents)();
            logger.debug('Current parent records:', {
                customObj: parentRecords,
            });
        }
        catch (err) {
            throw new Error((0, utils_1.handleErrorMessage)(err));
        }
        if (!parentRecords || !context_1.CONTEXT.config || !context_1.CONTEXT.packageDir) {
            return;
        }
        parentIds.forEach((id) => {
            delete parentRecords[id];
        });
        const { packageDir, configName, config } = context_1.CONTEXT;
        try {
            (0, utils_1.save)(path_1.default.join(packageDir, configName), JSON.stringify(config));
        }
        catch (err) {
            throw new Error((0, utils_1.handleErrorMessage)(err));
        }
        logger.info(`Successfully removed directories...`);
        logger.debug(`Current parent records:`, {
            customObj: parentRecords,
        });
        return parentRecords;
    }
}
exports.ParentsService = ParentsService;
