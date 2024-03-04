"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePath = void 0;
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../logger");
const logger = (0, logger_1.Logger)('utils.validatePath');
const validatePath = (dirpath, serverLog) => {
    if (!dirpath) {
        const message = `Please provide a directory path`;
        if (serverLog) {
            logger.warn(message);
            throw new Error(message);
        }
        else {
            console.warn(message);
            process.exit(1);
        }
    }
    if (dirpath === '.' && !serverLog) {
        return process.cwd();
    }
    else if (serverLog && /^\./.test(dirpath)) {
        logger.error(`Invalid path: "${dirpath}"`);
        throw new Error('Invalid path');
    }
    if (!fs_1.default.existsSync(dirpath)) {
        const message = `Invalid path: ${dirpath}`;
        if (serverLog) {
            logger.error(message);
            throw new Error(message);
        }
        else {
            console.error(message);
            process.exit(1);
        }
    }
    try {
        fs_1.default.readdirSync(dirpath, { withFileTypes: true });
    }
    catch (err) {
        let errMessage = `${dirpath} is not a directory.`;
        if (err instanceof Error) {
            errMessage = err.message || errMessage;
        }
        if (serverLog) {
            logger.error(errMessage);
            throw new Error(errMessage);
        }
        else {
            console.error(errMessage.red);
            process.exit(1);
        }
    }
    return dirpath;
};
exports.validatePath = validatePath;
