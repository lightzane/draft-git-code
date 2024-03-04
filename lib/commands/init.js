"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const context_1 = require("../context");
const init = (packageDir, clean = false) => {
    const encoding = 'utf-8';
    const template = {
        parents: {},
    };
    const configPath = path_1.default.join(packageDir, context_1.CONTEXT.configName);
    if (!fs_1.default.existsSync(configPath) || clean) {
        fs_1.default.writeFileSync(configPath, JSON.stringify(template), { encoding });
        if (clean) {
            console.log(`Config initialized`);
            process.exit();
        }
        return;
    }
    if (clean) {
        console.log(`Config already exists.`);
    }
    const jsonRaw = fs_1.default.readFileSync(configPath, { encoding });
    try {
        JSON.parse(jsonRaw);
    }
    catch (_a) {
        console.error('Config is corrupted');
        console.log('To clean up data, run: gcode clean');
        process.exit(1);
    }
    return;
};
exports.default = init;
