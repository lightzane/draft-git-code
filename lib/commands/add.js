"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const context_1 = require("../context");
const logger_1 = require("../logger");
const utils_1 = require("../utils");
const logger = (0, logger_1.Logger)('Commands.Add');
const add = (inputPath, options) => {
    const validPath = (0, utils_1.validatePath)(inputPath, options === null || options === void 0 ? void 0 : options.serverLog);
    logger.debug(`Validate Path:`, {
        customObj: {
            validPath,
        },
    });
    if (!context_1.CONTEXT.config || !context_1.CONTEXT.packageDir) {
        const message = 'Config is corrupted';
        if (options === null || options === void 0 ? void 0 : options.serverLog) {
            logger.error(message);
            throw new Error(message);
        }
        else {
            console.error(message);
            process.exit(1);
        }
    }
    const parents = context_1.CONTEXT.config.parents;
    const parentRecord = Object.entries(parents).find(([_, value]) => value.path === inputPath);
    if (parentRecord) {
        const message = 'Path already included.';
        if (options === null || options === void 0 ? void 0 : options.serverLog) {
            logger.warn(message);
            throw new Error(message);
        }
        else {
            console.warn(message);
            process.exit();
        }
    }
    const ts = Math.floor(Date.now() / 1000).toString();
    const name = path_1.default.basename(validPath);
    const slug = utils_1.TextUtil.slug(name);
    const id = slug === 'gcode' ? 'gcode' : ts;
    const newParent = {
        id,
        path: validPath,
        slug,
        name: utils_1.TextUtil.pascal(name),
        github: slug,
    };
    context_1.CONTEXT.config.parents[id] = newParent;
    const { packageDir, configName, config } = context_1.CONTEXT;
    (0, utils_1.save)(path_1.default.join(packageDir, configName), JSON.stringify(config));
    if (options === null || options === void 0 ? void 0 : options.serverLog) {
        logger.info(`Adding path: ${validPath}`);
        logger.debug(`Parent object added:`, {
            customObj: newParent,
        });
    }
    else {
        console.log('Path added!');
    }
    return newParent;
};
exports.default = add;
