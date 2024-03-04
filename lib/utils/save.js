"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../logger");
const logger = (0, logger_1.Logger)('utils.save');
const save = (filepath, data, serverLog) => {
    if (!fs_1.default.existsSync(filepath)) {
        if (serverLog) {
            const message = `Invalid path: ${filepath}`;
            logger.error(message);
            throw new Error(message);
        }
        else {
            console.error('Invalid path', filepath);
            process.exit();
        }
    }
    let isJSON = /\.json$/i.test(path_1.default.extname(filepath));
    if (isJSON) {
        try {
            data = JSON.parse(data);
            data = JSON.stringify(data, null, 2);
        }
        catch (_a) {
            isJSON = false;
        }
    }
    fs_1.default.writeFileSync(filepath, data, { encoding: 'utf-8' });
};
exports.save = save;
