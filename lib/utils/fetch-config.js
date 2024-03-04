"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const context_1 = require("../context");
const fetchConfig = () => {
    const { packageDir, configName } = context_1.CONTEXT;
    if (!packageDir) {
        return null;
    }
    const configPath = path_1.default.join(packageDir, configName);
    const configRaw = fs_1.default.readFileSync(configPath, {
        encoding: 'utf-8',
    });
    return JSON.parse(configRaw);
};
exports.fetchConfig = fetchConfig;
