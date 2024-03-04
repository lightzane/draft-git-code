"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchParents = void 0;
const context_1 = require("../context");
const logger_1 = require("../logger");
const fetch_config_1 = require("./fetch-config");
const logger = (0, logger_1.Logger)('utils.fetch-parents');
function fetchParents(parentSlug) {
    var _a;
    const data = (0, fetch_config_1.fetchConfig)();
    if (data) {
        context_1.CONTEXT.config = data;
    }
    logger.debug('Checking data...');
    const parents = (_a = context_1.CONTEXT.config) === null || _a === void 0 ? void 0 : _a.parents;
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
    const parentRecord = Object.entries(parents).find(([_, value]) => value.slug === parentSlug);
    if (!(parentRecord === null || parentRecord === void 0 ? void 0 : parentRecord.length)) {
        logger.debug('No data found');
        return null;
    }
    const parent = parentRecord[1];
    logger.debug(`Parent record found...`, {
        customObj: parent,
    });
    return parent;
}
exports.fetchParents = fetchParents;
