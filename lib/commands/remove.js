"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const context_1 = require("../context");
const utils_1 = require("../utils");
const remove = (inputPath) => {
    const validPath = (0, utils_1.validatePath)(inputPath);
    if (!context_1.CONTEXT.config || !context_1.CONTEXT.packageDir) {
        console.error('Config is corrupted');
        process.exit(1);
    }
    const parents = context_1.CONTEXT.config.parents;
    const parentRecord = Object.entries(parents).find(([_, value]) => value.path === validPath);
    if (!(parentRecord === null || parentRecord === void 0 ? void 0 : parentRecord.length)) {
        console.log('The path is not part of the list...');
        process.exit();
    }
    delete parents[parentRecord[0]];
    console.log('Path removed!');
    const { packageDir, configName, config } = context_1.CONTEXT;
    (0, utils_1.save)(path_1.default.join(packageDir, configName), JSON.stringify(config));
};
exports.default = remove;
