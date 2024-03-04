#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const commands_1 = __importDefault(require("../lib/commands"));
const context_1 = require("../lib/context");
const utils_1 = require("../lib/utils");
const packageDir = path_1.default.dirname(__dirname);
context_1.CONTEXT.packageDir = packageDir;
const p = process;
const pkgRaw = fs_1.default.readFileSync(path_1.default.join(packageDir, 'package.json'), {
    encoding: 'utf-8',
});
const pkg = JSON.parse(pkgRaw);
const args = p.argv.slice(2);
const command = args[0];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (command && (command === '-v' || command === '--version')) {
            console.log(`${pkg.name}@${pkg.version}`);
            return;
        }
        if (['clean', 'clear'].includes(command)) {
            commands_1.default.init(packageDir, true);
        }
        else {
            commands_1.default.init(packageDir);
        }
        const data = (0, utils_1.fetchConfig)();
        if (data) {
            context_1.CONTEXT.config = data;
        }
        let subcommand = args[1];
        switch (command) {
            case undefined:
            case 'serve':
            case 'start':
                const port = args[1];
                commands_1.default.serve(validatePort(port));
                break;
            case 'a':
            case 'add':
                commands_1.default.add(subcommand);
                break;
            case 'rm':
            case 'remove':
                commands_1.default.remove(subcommand);
                break;
            case 'list':
            case 'config':
                commands_1.default.config();
                break;
            case '-e':
            case 'e':
            case '--btoa':
            case 'btoa':
                console.log(Buffer.from(args[1] || '').toString('base64').cyan);
                break;
            case 'd':
            case '-d':
            case '--atob':
            case 'atob':
                console.log(Buffer.from(args[1] || '', 'base64').toString().yellow);
                break;
            case 'help':
            default:
                if (command && command !== 'help') {
                    console.log(`Unknown command: "${command}"`);
                }
                commands_1.default.help(pkg.name, pkg.version);
                break;
        }
    });
}
function validatePort(port) {
    if (isNaN(+port)) {
        return;
    }
    return +port;
}
main();
